import React, { Component } from 'react';
import {DatePicker,Spin,Row,Col} from '../common/UIComponents';
import PropTypes from 'prop-types';
import moment from 'moment';

const dateFormat = 'DD-MMM-YYYY';
const today = moment();
export default class MapDatePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mapViewArr:[],
            todayDate: today.format('DD-MMM-YYYY')
        }
    }
    render() {
        return(
            <div className='datePckrBtn'>
            <Row >
              <Col span={14} style={{backgroundColor:'#40a9ff',border:1,borderRadius:10, padding:5}}>
              <DatePicker
               defaultValue={moment(this.state.todayDate , dateFormat)} format={dateFormat}
               onChange={this.props.handleChange}
              />
              </Col>
              <Col span={2}>
              </Col>
              <Col span={8} style={{paddingTop:10}}>
              <Spin spinning={this.props.mapLoader} />
              </Col>
            </Row>
            </div>

        )
    }
}
MapDatePicker.propTypes = {
    handleChange: PropTypes.func,
  };