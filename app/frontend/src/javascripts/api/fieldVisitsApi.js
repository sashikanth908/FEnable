import { Call, ApiUrl, PageParams, ParseGeneralResponse } from './ApiUtils';

export function fetchFieldVisits(mapDate,id_user) {
  const url = ApiUrl(`/users/history?date=${mapDate}&user_id=${id_user}`);
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { checks_io: 'check_ins',punches_io:'punches' } });
}


/* export function fetchFieldVisits(mapDate,id_user) {
  const url = ApiUrl(`/users?date=${mapDate}&user_id=${id_user}`);
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { checks_io: 'check_ins',punches_io:'punches' } });
} */