import { publicApi } from "../api/public";
import type { LoginFormType, LoginResponse } from "../api/types";

export const AuthService = {
  async login(loginObj: LoginFormType): Promise<LoginResponse> {
    const response = await publicApi.post("/users/login/", {
      username: loginObj.username,
      password: loginObj.password,
    });
    console.log(response.data);
    return response.data;
  },
};
