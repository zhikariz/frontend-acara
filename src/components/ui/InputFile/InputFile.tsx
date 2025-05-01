import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  label?: ReactNode;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string;
}
const InputFile = (props: PropTypes) => {
  const {
    className,
    isDropable = false,
    label,
    name,
    onUpload,
    onDelete,
    isUploading,
    isInvalid,
    isDeleting,
    preview,
    errorMessage,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropZoneID = useId();

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && onUpload) {
        onUpload(files);
      }
    },
    [onUpload],
  );

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [handleDrop]);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropZoneID}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image fill src={preview} alt="image" className="!relative" />
            </div>
            <Button
              isIconOnly
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100"
              onPress={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="h-5 w-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />

            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and Drop or Click to Upload File Here"
                : "Click to Upload File Here"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropZoneID}`}
          name={name}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
