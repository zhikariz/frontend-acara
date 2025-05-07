import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("Please input name"),
  image: Yup.mixed<FileList | string>().required("Please input image"),
  isShow: Yup.string().required("Please input status"),
});

const useAddBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Banner added successfully",
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBanner) => {
    data.isShow = Boolean(data.isShow);
    mutateAddBanner(data);
  };
  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddBannerModal;
