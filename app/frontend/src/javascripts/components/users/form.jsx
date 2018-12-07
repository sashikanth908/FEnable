import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, FormItem, Input, Row } from '../../common/UIComponents';
import UserData from '../../common/userData';
import { I18n } from '../../common/Common';
import FormButtons from '../common/FormButtons';
import { saveUser } from '../../api/UsersApi';
import FormErrors from '../common/FormErrors';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user, isNew: this.props.isNew, inProgress: false };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOnChange(element, value) {
    this.setState({ user: Object.assign({}, this.state.user, { [element]: value }) });
  }

  handleSave() {
    this.setState({ inProgress: true });
    saveUser(this.state.isNew, Object.assign(this.state.user, { company_id: UserData.currentUser().company_id }))
      .then((result) => {
        if (result.success) {
          this.props.onSuccess(I18n.t('messages.saved'));
        } else {
          this.setState({ errors: result.errors, inProgress: false });
        }
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.first_name')}>
              <Input
                value={user.first_name}
                onChange={e => this.handleOnChange('first_name', e.target.value)}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.last_name')}>
              <Input
                value={user.last_name}
                onChange={e => this.handleOnChange('last_name', e.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.middle_name')}>
              <Input
                value={user.middle_name}
                onChange={e => this.handleOnChange('middle_name', e.target.value)}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.email')}>
              <Input
                value={user.email}
                onChange={e => this.handleOnChange('email', e.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.work_location')}>
              <Input
                value={user.work_location}
                onChange={e => this.handleOnChange('work_location', e.target.value)}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.designation')}>
              <Input
                value={user.designation}
                onChange={e => this.handleOnChange('designation', e.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.mobile_number')}>
              <Input
                value={user.mobile_number}
                onChange={e => this.handleOnChange('mobile_number', e.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.password')}>
              <Input
                value={user.password}
                onChange={e => this.handleOnChange('password', e.target.value)}
                type="password"
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label={I18n.t('general.password_confirmation')}>
              <Input
                value={user.password_confirmation}
                onChange={e => this.handleOnChange('password_confirmation', e.target.value)}
                type="password"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          {FormErrors(this.state.errors)}
        </Row>
        <Row>
          <Col xs={24} sm={12}>
            {FormButtons(this.state.inProgress, this.handleSave, this.props.onCancel)}
          </Col>
        </Row>
      </div>
    );
  }
}

UserForm.propTypes = {
  user: PropTypes.shape().isRequired,
  isNew: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

UserForm.defaultPropTypes = {
  user: {},
  isNew: true,
};

export default UserForm;
