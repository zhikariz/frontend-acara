import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateLocation = Yup.object().shape({
  address: Yup.string().required("Please input address"),
  isOnline: Yup.string().required("Please select status"),
  region: Yup.string().required("Please select region"),
  latitude: Yup.string().required("Please input latitude coordinate"),
  longitude: Yup.string().required("Please input latitude coordinate"),
});

const useLocationTab = () => {
  const debounce = useDebounce();

  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Regions", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  return {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    dataRegion,
    handleSearchRegion,
    searchRegency,
  };
};

export default useLocationTab;
