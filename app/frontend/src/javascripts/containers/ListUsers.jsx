import React, { Component } from 'react';
import _ from 'lodash';
import { deleteUser, fetchUsers, fetchUser } from '../api/UsersApi';
import { Col, Row, Spin , Button} from '../common/UIComponents';
import FullList from '../components/users/full-list';
import BaseModal from '../components/BaseModal';
import UserForm from '../components/users/form';
import AppConfig from '../config/AppConfig';
import Download from '../components/Download';
import { alertMessage, I18n } from '../common/Common';

class ListUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [], pagination: {}, showFormModal: false, currentUser: {}, inProgress: false,
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
  }

  componentWillMount() {
    this.fetchUsers(this.state.pagination.current,null);

  }

  onTableChange(pagination, filters, sorter) {
    this.fetchUsers(pagination.current,null);
  }

  fetchUsers(page = 1, perPage = null) {
    this.setState({ inProgress: true });
    fetchUsers(page, perPage)
      .then((result) => {
        if (result.success) {
          this.setState({ users: result.users, pagination: result.meta.pagination, inProgress: false });
        }
      });
  }

  handleAddClick() {
    this.setState({ currentUser: { active: true }, showFormModal: true });
  }

  handleEditClick(id) {
    // const index = _.findIndex(this.state.users, ['id', id]);
    // const user = Object.assign({}, this.state.users[index]);
    this.fetchUser(id);
    // if (this.fetchUser(id)) {
    //   this.setState({ showFormModal: true });
    // }
  }

  fetchUser(id) {
    this.setState({ inProgress: true });
    fetchUser(id)
      .then((result) => {
        if (result.success) {
          this.setState({ currentUser: result.user, inProgress: false, showFormModal: true });
        } else {
          alertMessage(result.errors[0], 'error', 10);
          this.setState({ inProgress: false });
        }
      });
  }

  handleDeleteClick(id) {
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
  }

  handleOnModalClose() {
    this.setState({ showFormModal: false });
  }

  renderFormModal() {
    let title;
    let isNew;
    if (this.state.currentUser.id) {
      title = I18n.t('users.edit');
      isNew = false;
    } else {
      title = I18n.t('users.add');
      isNew = true;
    }
    return (
      <BaseModal
        title={title}
        onCancel={() => this.handleOnModalClose()}
      >
        <UserForm
          user={this.state.currentUser}
          isNew={isNew}
          onCancel={() => this.handleOnModalClose()}
          onSuccess={message => this.handleSaveSuccess(message)}
        />
      </BaseModal>
    );
  }

  render() {
    const paginationData = {
      total: this.state.pagination.total_count,
      current: this.state.pagination.current_page,
      pageSize: this.state.pagination.per_page || AppConfig.perPage,
      position: 'both',
    };
    debugger;
    return (
      <div className='content-outer'>
        <div className='content'>
          <Row style={{marginTop:12}}>
            <Col span={20}>
            
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={() => this.handleAddClick()}>
              &#x2795;&nbsp;{ I18n.t('general.new') }
              </Button>
            </Col>
          </Row>
          <Spin spinning={this.state.inProgress} delay={1000}>
            <Row>
              <Col>
                <FullList
                  bordered
                  data={this.state.users}
                  editClick={id => this.handleEditClick(id)}
                  deleteClick={id => this.handleDeleteClick(id)}
                  pagination={paginationData}
                  onTableChange={(pagination, filter, sorter) => this.onTableChange(pagination, filter, sorter)}
                />
              </Col>
            </Row>
          </Spin>
          {this.state.showFormModal &&
            this.renderFormModal()
          }
        </div>
      </div>
    );
  }
}

export default ListUsers;
