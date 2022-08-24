import { Empresa } from "../empresa.interface";

export interface LoginResponse {
    data: LoginData;
    message: string;
}

export interface LoginData {
  usuario: Empresa;
  token: string;
  admin: boolean;
}