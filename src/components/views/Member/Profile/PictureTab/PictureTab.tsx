import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();
  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate, resetUpdatePicture]);
  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="w-full text-small text-default-400">
          Manage picture for your profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-full rounded-lg"
            >
              <Avatar
                src={currentPicture}
                alt="cover"
                showFallback
                className="aspect-square h-full w-full"
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                onDelete={() => handleDeletePicture(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                preview={typeof preview === "string" ? preview : ""}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Profile Picture
                  </p>
                }
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
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
export default PictureTab;
