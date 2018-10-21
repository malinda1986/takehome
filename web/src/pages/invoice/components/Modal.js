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
    span: 24,
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
      console.log('todo data', item)
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.id,
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
      <Form layout="horizontal">
        <FormItem label="" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="" hasFeedback {...formItemLayout}>
          {getFieldDecorator('text', {
            initialValue: item.text,
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea rows={4} />)}
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
