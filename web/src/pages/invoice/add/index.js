import { connect } from 'dva'
import { Page } from 'components'
import Modal from './components/Modal'
import _ from 'lodash'

import Add from './components/add'

const AddInvoice = ({
    location, dispatch, invoice, loading,
  }) => {

    console.log(invoice)
    const {
      list, currentItem, modalVisible, modalType, selectedRowKeys,
        showAddInvoiceSection,
        showAdditionalFileSection,
        showNotification,
        showInvoiceUploadSection,
        showLoading,
        loadingText,
        invoiceName,
        showFileList,
        files,
    } = invoice
  
    const modalProps = {
      item: _.isEmpty(currentItem) ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`invoice/${modalType}`],
      title: `${_.isEmpty(currentItem) ? 'Add Receipient' : 'Update Receipient'}`,
      wrapClassName: 'vertical-center-modal',
      onOk (data) {
        dispatch({
          type: `invoice/${modalType}`,
          payload: data,
        })
          
      },
      onCancel () {
        dispatch({
          type: 'invoice/hideModal',
        })
      },
    }
  
    const addInvoiceProps = {
      showAddInvoiceSection,
      showAdditionalFileSection,
      showNotification,  
      showFileList,
      showInvoiceUploadSection,
      showLoading,
      loadingText,
      invoiceName,
      currentItem,
      files,
      dataSource: list,
      loading: loading.effects['invoice/query'],
      
      location,
      onAddReceipient () {
        dispatch({
          type: 'invoice/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
      processInvoice (data) {
        dispatch({
          type: 'invoice/saveInvoice',
          payload: data,
        })
      },
      addMore (data) {
        dispatch({
          type: 'invoice/addMore',
          payload: data,
        })
      },
      removeFile (key) {
        dispatch({
          type: 'invoice/removeFile',
          payload: key,
        })
      },
      uploadInvoice (files){
        dispatch({
            type: 'invoice/uploadInvoice',
            payload: {
              files,
            },
          })
      },
      uploadMoreFiles (files){
        dispatch({
            type: 'invoice/saveFiles',
            payload: {
              files,
            },
          })
      },
      onEditItem (item) {
        dispatch({
          type: 'invoice/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'invoice/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  
    return (
        <Page inner>
             <Add {...addInvoiceProps} />
             {modalVisible && <Modal {...modalProps} />}
        </Page>
    )
}

export default connect(({ invoice, loading }) => ({ invoice, loading }))(AddInvoice)
