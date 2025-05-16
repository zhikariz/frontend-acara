import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  ILogin,
  IProfile,
  IRegister,
  IUpdatePassword,
} from "@/types/Auth";

const authServices = {
  register: async (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: async (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  login: async (payload: ILogin) =>
    instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: async (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getProfile: async () => instance.get(`${endpoint.AUTH}/me`),
  updateProfile: async (payload: IProfile) =>
    instance.put(`${endpoint.AUTH}/update-profile`, payload),
  updatePassword: async (payload: IUpdatePassword) =>
    instance.put(`${endpoint.AUTH}/update-password`, payload),
};

export default authServices;
