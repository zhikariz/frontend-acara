import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
  className?: string;
  isDropable?: boolean;
  name: string;
}
const InputFile = (props: PropTypes) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { className, isDropable = false, name } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropZoneID = useId();

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files[0] || null);
  };

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
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropZoneID}`}
      className={cn(
        "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
        className,
      )}
    >
      {uploadedImage ? (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="mb-2 w-1/2">
            <Image
              fill
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className="!jrelative"
            />
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">
            {uploadedImage.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />

          <p className="text-center text-sm font-semibold text-gray-500">
            {isDropable
              ? "Drag and Drop or Click to Upload File Here"
              : "Click to Upload File Here"}
          </p>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        id={`dropzone-file-${dropZoneID}`}
        name={name}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;
