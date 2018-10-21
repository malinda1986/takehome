import React from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Modal } from 'antd'
const { TextArea } = Input

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  
  const handleOk = () => {
    validateFields((errors) => {
     
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.id ? item.id : Date.now(),
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="">
        <FormItem label="Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Surname" hasFeedback {...formItemLayout}>
          {getFieldDecorator('surname', {
            initialValue: item.surname,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input  />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
