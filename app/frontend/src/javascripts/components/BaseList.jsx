import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../common/UIComponents';

class BaseList extends Component {
  render() {
    if (!this.props.data) {
      return null;
    }
    return (
      <div style={{ padding: '0 10px 20px' }}>
        <Table
          rowKey='id'
          dataSource={this.props.data}
          columns={this.columns}
          pagination={this.props.pagination}
          size='middle'
          onChange={this.props.onTableChange}
          bordered={this.props.bordered}
          align='center'
        />
      </div>
    );
  }
}

BaseList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  editClick: PropTypes.func,
  deleteClick: PropTypes.func,
  pagination: PropTypes.object,
  onTableChange: PropTypes.func,
  bordered: PropTypes.bool,
}

BaseList.defaultProps = {
  editClick: null,
  deleteClick: null,
  pagination: false,
  onTableChange: null,
  bordered: false,
}

export default BaseList;
