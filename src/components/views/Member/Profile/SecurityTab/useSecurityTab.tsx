import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdatePassword = Yup.object().shape({
  oldPassword: Yup.string().required("Please input your old password"),
  password: Yup.string().required("Please input your new password"),
  confirmPassword: Yup.string().required(
    "Please input your new password confirmation",
  ),
});

const useSecurityTab = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      resetUpdatePassword();
      setValueUpdatePassword("oldPassword", "");
      setValueUpdatePassword("password", "");
      setValueUpdatePassword("confirmPassword", "");
      setToaster({
        type: "success",
        message: "Password has been updated",
      });
    },
  });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  };
};

export default useSecurityTab;
