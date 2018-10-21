import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from 'moment'

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {


  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: '_id',
      width:100,
      key: '_id',
      render: (text, record) => <Link to={`invoice/${record._id}`}>{text}</Link>,
    },{
      title: 'Recipient',
      dataIndex: 'title',
      width:200,
      key: 'title',
      render: (text, record) => {
        return `${record.Receipient.Name} ${record.Receipient.Surname}` 
      },
    },{
      title: 'Date',
      dataIndex: 'Date',
      width:100,
      key: 'Date',
      render: (text, record) => <Link to={`invoice/${record.id}`}>{moment(text).format('YYYY-MM-DD')}</Link>,
    }, {
      title: 'Amount',
      width:50,
      dataIndex: 'Amount',
      key: 'Amount',
      render: (text, record) => {
        return '$ ' + text.toFixed(2)
      },
    },{
      title: 'Contact No',
      width:200,
      dataIndex: 'Phone',
      key: 'Phone',
      render: (text, record) => {
        return `${record.Receipient.Phone} ` 
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
