import { AxiosResponse } from "axios";
import { customAxios } from "../utils/commonUtils";
import { ILoginData } from "../dataTypes/authTypes";

export const signIn = (
  email: string,
  password: string
): Promise<AxiosResponse<ILoginData>> => {
  return customAxios.post(`/auth/login`, { email, password });
};
