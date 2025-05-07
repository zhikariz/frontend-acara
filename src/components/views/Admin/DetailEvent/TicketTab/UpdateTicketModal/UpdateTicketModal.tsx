import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedTicket: ITicket | null;
  setSelectedTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedTicket,
    setSelectedTicket,
  } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket,
  } = useUpdateTicketModal(`${selectedTicket?._id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedTicket(null);
    }
  }, [isSuccessMutateUpdateTicket, refetchTicket, onClose, setSelectedTicket]);

  useEffect(() => {
    if (selectedTicket) {
      setValueUpdateTicket("name", `${selectedTicket.name}`);
      setValueUpdateTicket("price", `${selectedTicket.price}`);
      setValueUpdateTicket("quantity", `${selectedTicket.quantity}`);
      setValueUpdateTicket("description", `${selectedTicket.description}`);
    }
  }, [selectedTicket, setValueUpdateTicket]);

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Price"
                      variant="bordered"
                      type="number"
                      isInvalid={errors.price !== undefined}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Quantity"
                      variant="bordered"
                      type="number"
                      isInvalid={errors.quantity !== undefined}
                      errorMessage={errors.quantity?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Description"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateTicket}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateUpdateTicket}
            >
              {isPendingMutateUpdateTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
