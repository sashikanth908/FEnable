import { Call, ApiUrl, PageParams, GeneralResponse, ParseGeneralResponse } from './ApiUtils';

export function fetchUsers(page = 1, perPage = null) {
  const url = ApiUrl(`/users?${PageParams(page, perPage)}`);
  return Call('get', url, {}, ParseGeneralResponse, { responseDataKeys: { users: 'users', meta: 'meta' } });
}

export function fetchUser(id) {
  const url = ApiUrl(`/users/${id}`);
  return Call('get', url, {}, GeneralResponse, { responseDataKey: 'user'});
}
export function saveUser(isNew, data) {
  const url = isNew ? ApiUrl('/users') : ApiUrl(`/users/${data.id}`);
  const method = isNew ? 'post' : 'put';
  return Call(method, url, data, ParseGeneralResponse, { responseDataKeys: { user: 'user' } });
}

export function deleteUser(id) {
  const url = ApiUrl(`/users/${id}`);
  return Call('delete', url, {}, ParseGeneralResponse, { responseDataKeys: {} });
}
