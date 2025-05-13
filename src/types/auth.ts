export interface LoginResponse {
  message: string;
  data: LoginData;
}

export interface LoginData {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}
// -----------------------------------
export interface LogoutResponse {
  message: string;
}

// -----------------------------

export interface AuthUserResponse {
  message: string;
  data: AuthUserData;
}

export interface AuthUserData {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: Date;
  createdAt: Date;
}
