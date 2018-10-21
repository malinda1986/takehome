/* global window */
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import {upload, create, query} from './services/invoice'
import { pageModel } from 'utils/model'
import {message} from 'antd'
import _ from 'lodash'

export default modelExtend(pageModel, {
  namespace: 'invoice',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    list: [],
    showAddInvoiceSection: false,
    showAdditionalFileSection: false,
    showNotification: true,
    showInvoiceUploadSection: true,
    showLoading: false,
    showFileList: false,
    loadingText: '',
    invoiceName: '',
    files:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/invoice') {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
    
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.response,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },


    * saveInvoice ({ payload }, { call, put }) {
       const data = yield call(create, payload)
       yield put({
        type: 'showLoading',
        payload: {
          showLoading: true,
          loadingText: 'Please wait. Uploading your invoice...',
        },
      })
       
       if(data.success){
        yield put({
          type: 'setState',
          payload: {
            currentItem: {},
            modalVisible: false,
            modalType: 'create',
            selectedRowKeys: [],
            list: [],
            showAddInvoiceSection: false,
            showAdditionalFileSection: false,
            showNotification: true,
            showInvoiceUploadSection: true,
            showLoading: false,
            showFileList: false,
            loadingText: '',
            invoiceName: '',
            files:[],
          },
        })
        yield put(routerRedux.push({
          pathname: '/invoice',
        }))
       }else{
        yield put({
          type: 'showLoading',
          payload: {
            showLoading: false,
            loadingText: '',
          },
        })
        message.error('Error in saving invoice, Please try again!')
       }
       
       
     },

    * create ({ payload }, { put }) {
      yield put({
        type: 'setState',
        payload: {
          currentItem : payload,
        },
      })
      yield put({ type: 'hideModal' })
    },

    * saveFiles ({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
        payload: {
          showLoading: true,
          loadingText: 'Please wait. Uploading your invoice...',
        },
      })
      const data = yield call(upload, payload)
     
      if(data.success){
        yield put({
          type: 'saveFilesState',
          payload: {
            file: data.response,
            key: Date.now(),
          },
        })
        yield put({
          type: 'showLoading',
          payload: {
            showLoading: false,
            loadingText: '',
          },
        })

        yield put({
          type: 'setState',
          payload: {
            showFileList: true,
          },
        })

      } else {
        yield put({
          type: 'showLoading',
          payload: {
            showLoading: false,
            loadingText: '',
          },
        })
        message.error('Error in uploading invoice file!')
      }
    },



    * uploadInvoice ({ payload }, { call, put }) {
        yield put({
          type: 'showLoading',
          payload: {
            showLoading: true,
            loadingText: 'Please wait. Uploading your invoice...',
          },
        })
        const data = yield call(upload, payload)
      
        if(data.success){
          yield put({
            type: 'setState',
            payload: {
              showLoading: false,
              loadingText: '',
              showAddInvoiceSection: true,
              showAdditionalFileSection: true,
              showNotification: false,
              showInvoiceUploadSection: false,
              invoiceName: data.response,
            },
          })
        } else {
          yield put({
            type: 'showLoading',
            payload: {
              showLoading: false,
              loadingText: '',
            },
          })
          message.error('Error in uploading invoice file!')
        }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    setState (state, {payload}) {
      return { ...state, ...payload }
    },

    showLoading (state, { payload }) {
      return { ...state, ...payload }
    },

    saveFilesState (state, { payload }) {
      const {files} = state
      files.push(payload)
      state.files = files
      return {...state}
    },

    addMore (state, { payload }) {
      const {files} = state
      const {description , key} = payload
      _.each(files, file => {
        if(file.key === key){
          file.description = description
        }
      })
      message.success('Record updated!')
      state.files = files
      return {...state}
    },

    removeFile (state, { payload }) {
      const {files} = state
      const {key} = payload
      _.each(files, (file, index) => {
        if(file.key === key){
          delete files[index]
        }
      })
      const newarr = files.filter(function () { return true })
      message.success('Record deleted!')

      state.files = newarr
      return {...state}
    },

  },
})
