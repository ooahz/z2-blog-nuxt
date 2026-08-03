export interface LoginUser {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  name: string;
}

export interface ResetPasswordUser {
  email: string;
  password: string;
  rePassword: string;
}
