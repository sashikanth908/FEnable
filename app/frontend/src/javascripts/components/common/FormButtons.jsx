import React from 'react';
import { Button, Col, Row } from '../../common/UIComponents';
import { I18n } from '../../common/Common';

const buttonStyles = {
  layout: {
    marginTop: 15,
  },
  button: {
    marginLeft: 15,
  },
};

const FormButtons = (
  isInProgress,
  saveCallback,
  cancelCallback = null,
  saveText = I18n.t('general.save'),
  cancelText = I18n.t('general.cancel'),
) => {
  return (
    <Row style={buttonStyles.layout}>
      <Col xs={24} className='text-right'>
        <Button disabled={isInProgress} onClick={cancelCallback} style={buttonStyles.button}>
          {cancelText}
        </Button>
        <Button type="primary" loading={isInProgress} onClick={saveCallback} style={buttonStyles.button}>
          {saveText}
        </Button>
      </Col>
    </Row>
  );
};

export default FormButtons;
