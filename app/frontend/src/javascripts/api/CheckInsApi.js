import { Call, ApiUrl, PageParams, DateParams, ParseGeneralResponse } from './ApiUtils';

export function fetchCheckIns(page = 1, perPage = null, fromDate = null, toDate = null, userId = null) {
  let url = ApiUrl(`/check_ins/list?${PageParams(page, perPage)}&${DateParams(fromDate, toDate)}`);
  if (userId !== null) {
    url += `&user_id=${userId}`;
  }
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { check_ins: 'check_ins', meta: 'meta' } });
}
