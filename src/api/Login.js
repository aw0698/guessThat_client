import {setInStorage} from "../utils/storage";



export function verifyLoggedIn(token) {
  return fetch('/users/verify?token=' + token)
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        return {
          token: token,
          isLoggedIn: json.success,
          isLoading: false,
          resetPassword: json.resetPassword
        };
      }
      else {
        return{
          isLoggedIn: json.success,
          isLoading: false
        };
      }
    });
}

export function loginUser(email, password) {
  return fetch('/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => res.json())
    .then(json => {
      if(json.success) {
        setInStorage('the_main_app', {token: json.token});
        return {
          success: json.success,
          alerts: json.message,
          isLoading: false,
          resetPassword: json.resetPassword,
          token: json.token
        };
      } else {
        return {
          success: json.success,
          alerts: json.message,
          isLoading: false
        };
      }
    });
}

export function logoutUser(token) {
  return fetch('/users/logout?token=' + token)
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        return {
          token: '',
          isLoggedIn: !json.success,
          isLoading: false,
          window: 'Login'
        };
      }
      else {
        return{
          isLoggedIn: json.success,
          isLoading: false
        };
      }
    });
}

export function createUser(email, password, password2) {
  return fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      password2: password2
    })
  }).then(res => res.json())
    .then(json => {
      return ({
        success: json.success,
        alerts: json.message,
        isLoading: false,
      });
      
    });
}

export function forgotPassword(email) {
  return fetch('/users/forgotPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
    })
  }).then(res => res.json())
    .then(json => {
      return ({
        success: json.success,
        alerts: json.message,
        resetPassword: true,
        isLoading: false,
      });
      
    });
}

export function resetPassword(email, newPassword, confirmNewPassword) {
  return fetch('/users/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    })
  }).then(res => res.json())
    .then(json => {
      return ({
        success: json.success,
        isLoggedIn: json.success,
        alerts: json.message,
        resetPassword: false,
        isLoading: false,
      });
      
    });
}

