import React, { Component } from 'react';
// import _ from 'lodash';
import { fetchUserTracks } from '../api/UserTracksApi';
import { Col, Row, Spin } from '../common/UIComponents';
import UserTrackList from '../components/user_tracks/list';
import AppConfig from "../config/AppConfig";
// import BaseModal from '../components/BaseModal';
// import UserForm from '../components/users/form';
// import AppConfig from '../config/AppConfig';
// import { alertMessage, I18n } from '../common/Common';

class UserTacks extends Component {
  constructor() {
    super();
    this.state = {
      user_tracks: [], inProgress: false,
    };
  }

  componentWillMount() {
    this.fetchUserTracks();
  }

  // onTableChange(pagination, filters, sorter) {
  //   this.fetchUserTracks(pagination.current);
  // }

  fetchUserTracks(page = 1, perPage = null) {
    this.setState({ inProgress: true });
    fetchUserTracks(page, perPage)
      .then((result) => {
        if (result.success) {
          this.setState({ user_tracks: result.user_tracks, inProgress: false });
        }
      });
  }

  render() {
    const paginationData = {
      total: this.state.user_tracks.count,
      pageSize: AppConfig.perPage,
    };
    return (
      <div className='content-outer'>
        <div className='content'>
          <Spin spinning={this.state.inProgress} delay={1000}>
            <Row>
              <Col>
                <UserTrackList
                  bordered
                  data={this.state.user_tracks}
                  pagination={paginationData}
                  // onTableChange={(pagination, filter, sorter) => this.onTableChange(pagination, filter, sorter)}
                />
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    );
  }
}

export default UserTacks;
