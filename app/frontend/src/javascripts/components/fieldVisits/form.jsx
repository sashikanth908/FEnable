import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, FormItem, Input, Row } from '../../common/UIComponents';
import UserData from '../../common/userData';
import { I18n } from '../../common/Common';
import FormButtons from '../common/FormButtons';
import { saveUser } from '../../api/UsersApi';
import FormErrors from '../common/FormErrors';

class NotesForm extends Component {
    constructor(props) {
      super(props);
     // this.state = { user: this.props.user, isNew: this.props.isNew, inProgress: false };
     // this.handleOnChange = this.handleOnChange.bind(this);
      //this.handleSave = this.handleSave.bind(this);
    }

    render() {
        return (
        <div>
                <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <FormItem label="Notes">
                    <Input
                        value=""
                        onChange=""
                    />
                    </FormItem>
                </Col>
                </Row>
                <Row>
                <Col xs={24} sm={12}>
                    {FormButtons(this.handleSave, this.props.onCancel)}
                </Col>
                </Row>
        </div>
        );
    }
}
export default NotesForm