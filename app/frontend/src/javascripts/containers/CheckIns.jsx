import React, { Component } from 'react';
import moment from 'moment';
import { fetchCheckIns } from '../api/CheckInsApi';
import { Col, Row, Spin } from '../common/UIComponents';
import CheckInList from '../components/checkins/list';
import AppConfig from '../config/AppConfig';
import DateRangeForm from '../components/common/date_range_form';
import { fetchUsers } from '../api/UsersApi';
import Download from '../components/Download';

const today = moment();
class CheckIns extends Component {
  constructor() {
    super();
    this.state = {
      check_ins: [],
      pagination: {},
      fromDate: moment(Date.now()-7*24*3600*1000).format('DD-MMM-YYYY'),
      toDate: today.format('DD-MMM-YYYY'),
      inProgress: false,
      usersList: [],
      selectedUser: null,
    };
    this.onTableChange = this.onTableChange.bind(this);
    this.dateRangeFormSubmit = this.dateRangeFormSubmit.bind(this);
  }

  componentWillMount() {
    this.fetchUsers();
  }

  onTableChange(pagination, filters, sorter) {
    this.fetchCheckIns(pagination.current, null, this.state.fromDate, this.state.toDate);
  }

  dateRangeFormSubmit(data) {
    this.setState({ fromDate: data.fromDate, toDate: data.toDate, selectedUser: data.selectedUser });
    this.fetchCheckIns(1, null, data.fromDate, data.toDate, data.selectedUser);
  }
  userSearch(data){
   if(data === undefined){
      this.setState({
        selectedUser: ''
      })
   }
   else{
     this.setState({
       selectedUser:data
     });
   }
  }

  fetchUsers() {
    this.setState({ inProgress: true });
    fetchUsers(1, 10000)
      .then((result) => {
        if (result.success) {
          this.setState({ usersList: result.users, inProgress: false });
          this.fetchCheckIns(this.state.pagination.current, null, this.state.fromDate, this.state.toDate);
        }
      });
  }

  fetchCheckIns(page = 1, perPage = null, fromDate = '', toDate = '', userId = null) {
    this.setState({ inProgress: true });
    fetchCheckIns(page, perPage, fromDate, toDate, userId)
      .then((result) => {
        if (result.success) {
          console.log(JSON.stringify(result));
          this.setState({ check_ins: result.check_ins, pagination: result.meta.pagination });
          this.setState({ inProgress: false });
        }
      });
  }

  render() {
    const paginationData = {
      total: this.state.pagination.total_count,
      current: this.state.pagination.current_page,
      pageSize: this.state.pagination.per_page || AppConfig.perPage,
      position: 'both',
    };
   // console.log(paginationData);
    return (
      <div className='content-outer'>
        <div className='content'>
                 {
        <Download
          data={this.state.check_ins}
          >
        </Download>
        }
          <Row style={{ marginBottom: 15, marginTop: 15, paddingLeft: 30, fontSize: 18 }}>
            <Col>
              <b> Check In Report </b>
            </Col>
          </Row>
          <Row style={{ marginBottom: 15, marginTop: 15 }}>
            <Col>
              <DateRangeForm
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                onSubmit={data => this.dateRangeFormSubmit(data)}
                selectedUser={this.state.selectedUser}
                usersList={this.state.usersList}
                userSearch={data => this.userSearch(data)}
              />
            </Col>
          </Row>
          <Spin spinning={this.state.inProgress} delay={1000}>
            <Row>
              <Col>

       
                <CheckInList
                  bordered
                  data={this.state.check_ins}
                  pagination={paginationData}
                  onTableChange={(pagination, filter, sorter) => this.onTableChange(pagination, filter, sorter)}
                />
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    );
  }
}

export default CheckIns;
