export interface User {
  username: string;
  password: string;
  token: string;
}

export interface UserLogout {
  data: string;
  status: string;
  statusText: string;
}

export interface UserSignup {
  token: string;
  statusText: string;
}

export interface UserChangePassword {
  message: string;
}
