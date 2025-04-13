import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, IRegister } from "@/types/Auth";

const authServices = {
  register: async (payload: IRegister) => {
    return instance.post(`${endpoint.AUTH}/register`, payload);
  },
  activation: async (payload: IActivation) => {
    return instance.post(`${endpoint.AUTH}/activation`, payload);
  },
};

export default authServices;
