import React, { Component } from 'react';
import _ from 'lodash';
import { deleteUser, fetchUsers } from '../api/UsersApi';
import { Col, Row, Spin , Input} from '../common/UIComponents';
import UserList from '../components/users/list';
import BaseModal from '../components/BaseModal';
import UserForm from '../components/users/form';
import AppConfig from '../config/AppConfig';
import { alertMessage, I18n } from '../common/Common';
import Download from '../components/Download';

class Users extends Component {
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
    this.fetchUsers();
  }

  onTableChange(pagination, filters, sorter) {
    this.fetchUsers(pagination.current);
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
    const index = _.findIndex(this.state.users, ['id', id]);
    const user = Object.assign({}, this.state.users[index]);
    this.setState({ currentUser: user, showFormModal: true });
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
    return (
      <div className='content-outer'>
        <div className='content'>
          <Row>
            <Col>
              {/* <Search 
               placeholder="Search...."
              /> */}
            </Col>
          </Row>
          <Spin spinning={this.state.inProgress} delay={1000}>
            <Row style={{marginTop:15,marginBottom:35}}>
              <Col>

            {
             <Download
              data={this.state.users}
              >
              </Download>
            }
                 <UserList
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

export default Users;
