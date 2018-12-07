import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../common/UIComponents';

class BaseModal extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible
        destroyOnClose
        footer={null}
        onCancel={this.props.onCancel}
      >
        {this.props.children}
      </Modal>
    );
  }
}

BaseModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default BaseModal;
