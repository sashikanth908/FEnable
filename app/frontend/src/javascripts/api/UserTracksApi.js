import { Call, ApiUrl, PageParams, ParseGeneralResponse } from './ApiUtils';

export function fetchUserTracks(page = 1, perPage = null) {
  const url = ApiUrl(`/users/users_latest_tracks?${PageParams(page, perPage)}`);
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { user_tracks: 'tracks', meta: 'meta' } });
}
