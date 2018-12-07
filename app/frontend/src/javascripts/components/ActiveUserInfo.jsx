import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from '../common/UIComponents';

export default class ActiveUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fenceName: '',
      geofenceTypeId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGeofenceTypeChange = this.handleGeofenceTypeChange.bind(this);
  }

  render() {
    return (
      <div style={{position:'absolute', left:30,top:10}}>
          <Row>
              <Col span={12}>Field Visits</Col><Col span={12}> User </Col>
          </Row>
      </div>
    );
  }
}