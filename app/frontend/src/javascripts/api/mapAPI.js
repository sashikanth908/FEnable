import { Call, ApiUrl, PageParams, DateParams, ParseGeneralResponse } from './ApiUtils';


export function fetchCheckIOPunchesIO(mapDate) {
    const url = ApiUrl(`/users/history?date=${mapDate}`);
    return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { checks_io: 'check_ins',punches_io:'punches' } });
}