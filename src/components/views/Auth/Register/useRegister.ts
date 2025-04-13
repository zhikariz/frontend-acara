import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import authServices from "@/services/auth.service";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("please input your fullname"),
  username: yup.string().required("please input your username"),
  email: yup
    .string()
    .email("email format not valid")
    .required("please input your email"),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .required("please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "password confirmation doesn't match")
    .required("please input your password confirmation"),
});

const useRegister = () => {
  const router = useRouter();

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
    onError: (error) => {
      setError("root", {
        message: error.message,
      });
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
