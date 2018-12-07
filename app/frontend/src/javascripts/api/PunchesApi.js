import { Call, ApiUrl, PageParams, DateParams, ParseGeneralResponse } from './ApiUtils';

export function fetchPunches(page = 1, perPage = null, fromDate = null, toDate = null, userId = null) {
  let url = ApiUrl(`/punches/list?${PageParams(page, perPage)}&${DateParams(fromDate, toDate)}`);
  if (userId !== null) {
    url += `&user_id=${userId}`;
  }
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { punches: 'punches', meta: 'meta' } });
}
