import { privateApi } from "../api/private";
import { publicApi } from "../api/public";
import type {
  LoginFormType,
  LoginResponse,
  SignUpType,
  UserType,
} from "../api/types";

export const AuthService = {
  async login(loginObj: LoginFormType): Promise<LoginResponse> {
    const response = await publicApi.post<LoginResponse>("/users/login/", {
      username: loginObj.username,
      password: loginObj.password,
    });
    const tokens = response.data;

    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    return response.data;
  },
  async signUp(loginObj: SignUpType): Promise<LoginResponse> {
    const response = await publicApi.post("/users/", {
      username: loginObj.username,
      email: loginObj.email,
      password: loginObj.password,
    });
    return response.data;
  },
  async getUser(): Promise<UserType> {
    const response = await privateApi.get("/users/me");
    console.log(response.data);
    return response.data;
  },
};
