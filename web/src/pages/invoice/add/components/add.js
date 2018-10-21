import React from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import styles from './index.less'
import { Form, Col, Input, Row, Button, Alert, DatePicker, Spin, message } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const validateForm = (currentItem, files, frmData) => {
    if(_.isEmpty(currentItem)){
        message.error('Please fill the receipient information')
        return false
    }
    const {amount, date} = frmData
    if(_.isEmpty(amount)){
        message.error('Please enter invoice amount')
        return false
    }
    if(_.isEmpty(date)){
        message.error('Please enter invoice date')
        return false
    }

    if(!_.isEmpty(files)){
        _.each(files, file=>{
            if(_.isEmpty(file.description)){
                message.error('Please enter invoice date')
                return false
            }
        })
    }

    return true
}

const Detail = (
    {
        onAddReceipient,
        showAddInvoiceSection,
        showAdditionalFileSection,
        showNotification, 
        showInvoiceUploadSection,
        showLoading,
        loadingText,
        invoiceName,
        showFileList,
        currentItem,
        uploadMoreFiles,
        processInvoice,
        files,
        form: {
            getFieldDecorator,
            getFieldsValue,
        },
        uploadInvoice,
        addMore,
        removeFile,
    }) => {


    const onProcessInvoice = () => {
        const frmData =  {...getFieldsValue()}
        if(validateForm(currentItem, files, frmData)){
            processInvoice({currentItem, files, frmData, invoice:invoiceName})
        }
    }

    const getBase64FromBlob = (acceptedFiles) => {
        return  new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(acceptedFiles)
            reader.onload = () => {
                if (!!reader.result) {
                    resolve(reader.result)
                }
                else {
                    reject(Error("Failed converting to base64"))
                }
            }
    
        })
    }  

    const addMoreFiles = (key) => {
        const frmData =  {...getFieldsValue()}
        console.log(key)
        if(_.isEmpty(frmData['descriotion_'+key])){
            message.error('Please enter file description')
            return
        }
        addMore({key, description: frmData['descriotion_'+key]})
    }

    const removeMoreFiles = (key) => {
        removeFile({key})
    }

    const validateNumber = (rule, value, callback) => {
        if(isNaN(parseFloat(value))){
            callback('Please enter valid amount')
        }else{
            callback()
        }
    }

    const onUploadInvoice = (acceptedFiles) => {
        getBase64FromBlob(acceptedFiles[0])
        .then(file => {
            uploadInvoice({file, name: acceptedFiles[0].name, type: 'invoice'})    
        })
    }   
    
    const onUploadMoreFiles = (acceptedFiles) => {
        getBase64FromBlob(acceptedFiles[0])
        .then(file => {
            uploadMoreFiles({file, name: acceptedFiles[0].name, type: 'more'})    
        })
    }   

    const AddInvoiceFile = () => {
        return (
            <div style={{
                marginTop:10,
                padding:60,
                backgroundColor: '#f7f5f2',
                boxShadow: '1px 1px 2px 1px #c3b3b3',
                borderRadius: 6,
            }}>
                <Row>
                    <div>
                    <FormItem       
                        label=""
                        >
                        {getFieldDecorator('invoiceFile', {
                            valuePropName: 'fileList',
                            
                        })(
                            <Dropzone
                            style={{width:'100%'}}
                            onDrop={ onUploadInvoice }
                        >
                               
                                <p style={{textAlign:'center', fontSize:15}} className="ant-upload-text">Click or drag your file here</p>
                        </Dropzone>
                        )}
                        
                    </FormItem>
                    </div>
                </Row>
            </div>
        )
    }    

    const InvoiceDetails = () => {
        const getFields = () => {
            const children = []
              children.push(
                <Col span={8} style={{ display:  'block' }}>
                  <FormItem label={`Invoice Amount`}>
                    {getFieldDecorator(`amount`, {
                      rules: [{
                        required: true,
                        message: 'Please enter invoice amount',
                      },{validator:validateNumber}],
                    })(
                      <Input placeholder="Invoice amount"  formatter={value => `${value}.00`}
                      />
                    )}
                  </FormItem>
                </Col>)
                children.push(
                    <Col span={8} style={{ display:  'block' }}>
                        <FormItem label={`Payment Target`}>
                        {getFieldDecorator(`date`, {
                            rules: [{
                            required: true,
                            message: 'Please enter payment target date',
                            }],
                        })(
                        <DatePicker  />
                        )}
                        </FormItem>
                    </Col>)
                    
                children.push(
                    <Col span={8} >
                        <span style={{fontWeight: 'bold'}}>Receipent Details</span>
                        <div>Invoice File : {invoiceName}</div>
                        {
                            !_.isEmpty(currentItem) ?  <div>Full Name : {currentItem.name + ''+  currentItem.surname}</div> : ''
                        }
                        {
                            !_.isEmpty(currentItem) ?  <div>Address : {currentItem.address}</div> : ''
                        }
                    </Col>)    
            return children
          }
        
        return (
            <div style={{
                backgroundColor: "#dce4ea",
                padding: 15,
                borderRadius: 2,
            }}>
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={()=> {onAddReceipient()}} >{ _.isEmpty(currentItem) ? 'Add Receipent': 'Update Receipent'}</Button>
                       
                    </Col>
                </Row>
            </div>
           
        )
    }

    const AdditionalFilesSection = () => {
        const getFields = (file) => {
            const children = []
              children.push(
                <Col span={8} style={{ display:  'block' }}>
                  <span>Addtional files</span>
                  <div style={{
                     width: 220, wordWrap: 'break-word'
                  }}><p>{file.file}</p></div>
                 
                </Col>)
                children.push(
                    <Col span={8} style={{ display:  'block' }}>
                        <FormItem label={`Description`}>
                        {getFieldDecorator(`descriotion_${file.key}`, {
                            rules: [{
                            required: true,
                            message: 'Please enter file description',
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                        </FormItem>
                    </Col>)
                children.push(
                    <Col span={8} >
                        <div style ={{
                            paddingLeft: '50%',
                            paddingBottom: 10,
                            paddingTop: 40,
                        }}>
                            <Button type="primary" onClick={()=> {addMoreFiles(file.key)}} >Add</Button> <br/>
                        </div>
                        <div 
                            style ={{
                                paddingLeft: '50%',
                                paddingBottom: 10,
                            }}
                        >
                            <Button type="danger" onClick={()=> {removeMoreFiles(file.key)}}>Remove</Button> <br/>
                        </div>   
                    </Col>)    
            return children
          }
       
        const showMoreFiles = () => {
            const addiFiles = []
            if(!_.isEmpty(files)){
                _.each(files, file => {
                    addiFiles.push(
                        <Row gutter={24} >{getFields(file)}</Row>
                        )
                })
            }
            return addiFiles
        }
        
        return (
            <div
                style={{
                    backgroundColor: "#dce4ea",
                    padding: 15,
                    boxShadow: '1px 2px 1px 0px #5f7c96',
                    borderRadius: 2,
                    marginTop:20,
                    
                }}
            >

                <div
                    style={{
                        backgroundColor: "#c3d4e0",
                        padding: 15,
                        boxShadow: '1px 2px 1px 0px #5f7c96',
                        borderRadius: 8,
                        marginTop:20,
                        display: showFileList ? 'block' : 'none',
                    }}
                >
                    <Row gutter={24} >{showMoreFiles()}</Row>
                </div>
                
                
                <Row>
                    <div style={{
                            padding: '40px',
                            backgroundColor: '#c1cad4',
                            borderRadius: 8,
                            boxShadow: '0 0 1px black',
                            marginBottom:10,
                            marginTop:10,
                    }}>
                    <FormItem       
                        label=""
                        >
                        {getFieldDecorator('moreFile', {
                            valuePropName: 'fileList',
                            
                        })(
                            <Dropzone
                            style={{width:'100%'}}
                            onDrop={ onUploadMoreFiles }
                        >
                               
                                <p style={{textAlign:'center', fontSize:15}} className="ant-upload-text">Click or drag your additional files here</p>
                        </Dropzone>
                        )}
                    </FormItem>
                    </div>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" size='large' onClick={()=>{onProcessInvoice()}}>Proceed</Button>
                        
                    </Col>
                </Row>

            </div>
        )
    }

   
    return (
        <Spin spinning={showLoading} tip={loadingText}>
            <div className="content-inner" >
                <div
                    style={{paddingBottom:5, display: showNotification ? 'block': 'none'}}
                >
                    <Alert message="Upload your invoice below" type="info" showIcon />
                </div>
                <div style={{ display: showInvoiceUploadSection ? 'block': 'none'}}>
                    {AddInvoiceFile()}
                </div>
                <div className={styles.content} style={{overflowX:'auto'}}>
                    <div style={{display: showAddInvoiceSection ? 'block' : 'none'}}>
                        {InvoiceDetails()}
                    </div>
                    <div style={{display: showAdditionalFileSection ? 'block' : 'none'}}>
                        {AdditionalFilesSection()}
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default Form.create()(Detail)
