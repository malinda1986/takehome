/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col } from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
}) => {
  

  return (
    <Row gutter={24}>
     
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          <div className="flex-vertical-center" style={{float:'right'}}>
          <Link to={'/invoice/add'} >
            <Button type="ghost" >Add Invoice</Button> 
          </Link>
           
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
