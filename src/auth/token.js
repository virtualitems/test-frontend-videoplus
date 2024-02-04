export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function getAuthData() {
  return JSON.parse(localStorage.getItem('authData'));
}

export function setAuthToken(token, authdata) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authData', JSON.stringify(authdata));
}

export function deleteAuthToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authData');
}
