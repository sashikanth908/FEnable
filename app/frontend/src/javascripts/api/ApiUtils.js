import axios from 'axios/index';
import _ from 'lodash';
import AppConfig from '../config/AppConfig';

export function PageParams(page, perPage) {
  return `page=${page || 1}&per_page=${perPage || AppConfig.perPage}`;
}

export function DateParams(fromDate, toDate) {
  return `from_date=${fromDate && fromDate}&to_date=${toDate && toDate}`;
}

export function ApiUrl(path) {
  return `${AppConfig.baseUrl}/api/v1${path}`;
}

export function HttpErrorMessage(error) {
  if (_.get(error, 'response.data.errors', null)) {
    return error.response.data.errors;
  }
  return [error.message];
}

export function ParseGeneralResponse(success, response, options) {
  const result = { success };
  if (success) {
    const dataKeys = options.responseDataKeys;
    _.forEach(dataKeys, (value, key) => {
      result[key] = _.get(response, `data.${value}`, null);
    });
  } else {
    result.errors = HttpErrorMessage(response);
  }
  return result;
}

export function GeneralResponse(success, response, options) {
  const result = { success };
  if (success) {
    result[options.responseDataKey] = response.data;
  } else {
    result.errors = HttpErrorMessage(response);
  }
  return result;
}

export function Call(method, url, data, parseCallback, options) {
  return new Promise((resolve) => {
    axios({
      method,
      url,
      data,
    })
      .then((response) => {
        resolve(parseCallback(true, response, options));
      })
      .catch((error) => {
        resolve(parseCallback(false, error, options));
      });
  });
}
