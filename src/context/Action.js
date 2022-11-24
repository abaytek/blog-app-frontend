export const loginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});

export const updateStart = (userCredentials) => ({
  type: "UPDATE_START",
  payload: userCredentials,
});
export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const updateFailure = (userCredentials) => ({
  type: "UPDATE_FAILURE",
  payload: userCredentials,
});
