import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}
const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  } = useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessMutateDeleteBanner) {
      onClose();
      refetchBanner();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteBanner, onClose, refetchBanner, setSelectedId]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={() => {
        onClose();
        setSelectedId("");
      }}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this banner ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => onClose()}
            disabled={isPendingMutateDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => mutateDeleteBanner(selectedId)}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
