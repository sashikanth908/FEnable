import React, { Component } from 'react';
import _ from 'lodash';
import { fetchFieldVisits } from '../api/fieldVisitsApi';
import { Col, Row, Spin , DatePicker, Button} from '../common/UIComponents';
import FieldVisitsListData from '../components/fieldVisits/list';
import BaseModal from '../components/BaseModal';
import NotesForm from '../components/fieldVisits/form';
import moment from 'moment';
import AppConfig from '../config/AppConfig';
import { alertMessage, I18n } from '../common/Common';
import ActiveUser from '../components/ActiveUser';

const dateFormat = 'DD-MMM-YYYY';
const today = moment();

class FieldVisitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user:"",
      user_name:'',
      dataArr_checks_io: [],
      timeIn: '',
      timeOut:'', 
      inProgress: false,
      pagination: {},      
      todayDate: today.format('DD-MMM-YYYY'),
      distanceTravelled:''
    };
   // this.handleEditClick = this.handleEditClick.bind(this);
   // this.onTableChange = this.onTableChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
   // console.log('1st-pass:',this.props.location.search.split('=')[1]);
    this.setState({
         id_user:this.props.location.search.split('=')[1]
    });
    this.setState({
      user_name:decodeURIComponent(this.props.location.search.split('=')[2])
    });
    //console.log('2nd-pass:',this.state.id_user);
    this.fetchFieldVisits(this.state.todayDate,this.state.id_user);
  }

  /* onTableChange(pagination, filters, sorter) {
    this.fetchFieldVisits(pagination.current);
  } */
  
  fetchFieldVisits(dd,userID) {
    this.setState({ inProgress: true });
    fetchFieldVisits(dd,userID)
      .then((result) => {
        if (result.success) {
              console.log(result);
              if(result.punches_io.length > 0){
                this.setState({
                    timeIn : moment(result.punches_io[0].punch_in_datetime).isValid() ? moment(result.punches_io[0].punch_in_datetime).format('hh:mm A') : '00:00',
                    timeOut :moment(result.punches_io[0].punch_out_datetime).isValid() ? moment(result.punches_io[0].punch_out_datetime).format('hh:mm A') : '00:00',
                    distanceTravelled:'Coming Soon...'
                  });
              }
              else{
                this.setState({
                  timeIn:'',
                  timeOut:'',
                  distanceTravelled:''
                });
              }
              if(result.checks_io.length > 0){
                this.setState({ dataArr_checks_io: result.checks_io, inProgress: false });
              }
              else{
                this.setState({ dataArr_checks_io: result.checks_io, inProgress: false });
                alertMessage('Check In and Check Out data not found.', 'error', 1);
              }             
        }
      });
  }

 /*  handleAddClick() {
    this.setState({ currentUser: { active: true }, showFormModal: true });
  }
 */
  handleEditClick(id) {
    const index = _.findIndex(this.state.dataArr_checks_io, ['comments', id]);
    const obj = Object.assign({}, this.state.dataArr_checks_io[index]);
    this.setState({ currentUser: obj, showFormModal: true });
  }

  /*handleDeleteClick(id) {
    this.setState({ inProgress: true });
    deleteUser(id)
      .then((result) => {
        if (result.success) {
          alertMessage(I18n.t('messages.deleted'));
          this.fetchUsers();
        } else {
          alertMessage(result.errors[0], 'error', 10);
          this.setState({ inProgress: false });
        }
      });
  }

  handleSaveSuccess(message) {
    alertMessage(message);
    this.setState({ showFormModal: false });
    this.fetchUsers();
  }*/

  handleOnModalClose() {
    this.setState({ showFormModal: false });
  }
  handleChange(event){
    let setDate = event.year()+"-"+(event.month()+1)+"-"+event.date();
        console.log('hc:',setDate);
     this.fetchFieldVisits(setDate,this.state.id_user);
  }
  renderFormModal() {
    return (
      <BaseModal
        title="Notes"
        onCancel={() => this.handleOnModalClose()}
      >
        <NotesForm
          onCancel={() => this.handleOnModalClose()}
          onSuccess={message => this.handleSaveSuccess(message)}
        />
      </BaseModal>
    );
  }

  render() {
    /* const paginationData = {
      total: this.state.pagination.total_count,
      current: this.state.pagination.current_page,
      pageSize: 6,
    }; */
    return (
      <div className='content-outer'>
        <div className='content'>
          <Row gutter={16} style={{padding:20,paddingTop:40}}>
            <Col span={2} style={{paddingLeft:10}}>
            <div style={{color:'#2e97d8'}}><b> Time In :</b></div>
            </Col>
            <Col span={3}>
            {this.state.timeIn}
            </Col>
            <Col span={2}>
            <div style={{color:'#2e97d8'}}><b> Time Out :</b></div>
            </Col>
            <Col span={3}>
            {this.state.timeOut}
            </Col>
            <Col span={2}>
            <div style={{color:'#2e97d8'}}><b> Distance:</b>
            </div>
            </Col>
            <Col span={3} style={{fontSize:13,fontWeight:600,paddingTop:1}}>
            {this.state.distanceTravelled}
            </Col>
            <Col span={4}>
            </Col>
            <Col span={4} className="float-right">
            <DatePicker
             defaultValue={moment(this.state.todayDate, dateFormat)} format={dateFormat}
             onChange={this.handleChange}
            />
            </Col>
          </Row>
          <Spin spinning={this.state.inProgress} delay={1000}>
          <Row>
              <Col>
                <FieldVisitsListData
                  bordered
                  data={this.state.dataArr_checks_io}
                  //editClick={id => this.handleEditClick(id)}
                  //deleteClick={id => this.handleDeleteClick(id)}
                  //pagination={paginationData}
                  //onTableChange={(pagination, filter, sorter) => this.onTableChange(pagination, filter, sorter)}
                />
              </Col>
          </Row>
          </Spin>
          {
            this.state.showFormModal &&
            this.renderFormModal()
          }
          {
            <ActiveUser
            activeUserName={this.state.user_name}
            /> 
          }
        </div>
      </div>
    );
  }
}

export default FieldVisitsList;
