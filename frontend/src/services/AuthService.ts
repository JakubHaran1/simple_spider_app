import { publicApi } from "../api/public";
import type { LoginFormType, LoginResponse } from "../api/types";

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
};
