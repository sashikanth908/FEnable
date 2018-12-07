import { message } from './UIComponents';

const I18n = require('./I18n');


function alertMessage(messageToShow, type, duration = 2) {
  switch (type) {
  case 'warning': {
    message.warning(messageToShow, duration);
    return;
  }
  case 'error': {
    message.error(messageToShow, duration);
    return;
  }
  default: {
    message.success(messageToShow, duration);
  }
  }
}

export {
  alertMessage,
  I18n,
};
