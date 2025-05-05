import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  slug: Yup.string().required("Please input slug"),
  category: Yup.string().required("Please select category"),
  startDate: Yup.mixed<DateValue>().required("Please select start date"),
  endDate: Yup.mixed<DateValue>().required("Please select end date"),
  isPublish: Yup.string().required("Please select status"),
  isFeatured: Yup.string().required("Please select featured"),
  description: Yup.string().required("Please input description"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  };
};

export default useInfoTab;
