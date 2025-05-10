export interface LoginResponse {
  welcome: string;
  data: Data;
}

export interface Data {
  session: Session;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface LogoutResponse {
  message: string;
}
