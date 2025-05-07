import { IEvent, IEventForm } from "@/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEvent;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
    }
  }, [dataEvent, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  defaultValue={dataEvent?.name}
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  defaultValue={dataEvent?.slug}
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data?.data || []}
                  label="Category"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  labelPlacement="outside"
                  defaultSelectedKey={dataEvent?.category}
                  onSelectionChange={(value) => {
                    onChange(value);
                  }}
                  placeholder="Search category here..."
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={dataEvent?.isPublish !== undefined}
            className="rounded-lg"
          >
            <Controller
              name="isPublish"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isPublish !== undefined}
                  errorMessage={errorsUpdateInfo.isPublish?.message}
                  labelPlacement="outside"
                  defaultSelectedKeys={[
                    dataEvent?.isPublish ? "true" : "false",
                  ]}
                  disallowEmptySelection
                >
                  <SelectItem key="true">Publish</SelectItem>
                  <SelectItem key="false">Draft</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={dataEvent?.isFeatured !== undefined}
            className="rounded-lg"
          >
            <Controller
              name="isFeatured"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                  errorMessage={errorsUpdateInfo.isFeatured?.message}
                  disallowEmptySelection
                  labelPlacement="outside"
                  defaultSelectedKeys={[
                    dataEvent?.isFeatured ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  labelPlacement="outside"
                  defaultValue={dataEvent?.description}
                />
              )}
            />
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataEvent?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
