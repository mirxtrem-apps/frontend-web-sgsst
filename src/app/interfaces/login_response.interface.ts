
export interface LoginResponse {
    data: LoginData;
    message: string;
}

export interface LoginData {
  token: string;
}