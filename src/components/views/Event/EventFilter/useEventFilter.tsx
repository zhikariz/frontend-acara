import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import * as Yup from "yup";

const schema = Yup.object().shape({
  category: Yup.string().required("Please select category"),
  isOnline: Yup.string().required("Please select online or offline"),
  isFeatured: Yup.string().required("Please select featured"),
});

const useEventFilter = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });
  return {
    control,
    errors,
    dataCategory,
    isSuccessGetCategory,
    setValue,
  };
};

export default useEventFilter;
