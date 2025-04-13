import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, IRegister } from "@/types/Auth";

const authServices = {
  register: async (payload: IRegister) => {
    instance.post(`${endpoint.AUTH}/register`, payload);
  },
  activation: async (payload: IActivation) => {
    instance.post(`${endpoint.AUTH}/activation`, payload);
  },
};

export default authServices;
