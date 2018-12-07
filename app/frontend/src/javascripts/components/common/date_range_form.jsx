import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, DatePicker, Button, Select } from '../../common/UIComponents';

const dateFormat = 'DD-MMM-YYYY';
class DateRangeForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnUserChange = this.handleOnUserChange.bind(this);
  }

  componentWillMount() {
    this.setState({ fromDate: this.props.fromDate, toDate: this.props.toDate, selectedUser: this.props.selectedUser });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
  }

  handleOnChange(element, date, dateString) {
    this.setState({ [element]: dateString });
  }

  handleOnUserChange(element, value) {
    this.setState({ [element]: value });
  }


  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="User:"
        >
          <Select
            defaultValue="All Users"
            placeholder="Select User"
            allowClear='true'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={val => this.handleOnUserChange('selectedUser', val)}
            showSearch
            style={{ width: 130, height: 20, fontSize: 12 }}
          >
            {
              this.props.usersList.map(data => (
                <Select.Option
                  style={{ fontSize: 12 }}
                  key={data.id}
                  title={data.id}
                  value={data.id}
                >
                  {data.full_name}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="From :"
        >
          <DatePicker
            defaultValue={moment(this.props.fromDate)}
            format={dateFormat}
            onChange={(date, dateString) => this.handleOnChange('fromDate', date, dateString)}
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="To :"
        >
          <DatePicker
            defaultValue={moment(this.props.toDate)}
            format={dateFormat}
            onChange={(date, dateString) => this.handleOnChange('toDate', date, dateString)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

DateRangeForm.propTypes = {
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  selectedUser: PropTypes.string,
  usersList: PropTypes.object.isRequired,
};

DateRangeForm.defaultProps = {
  fromDate: null,
  toDate: null,
  selectedUser: null,
};

export default DateRangeForm;
