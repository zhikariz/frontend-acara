import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import convertIDR from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback } from "react";
import { TICKET_LIST_EVENT } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
    selectedTicket,
    setSelectedTicket,
  } = useTicketTab();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );
  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={TICKET_LIST_EVENT}
            data={dataTicket || []}
            emptyContent="Ticket is Empty"
            renderCell={renderCell}
            isLoading={isPendingTicket || isRefetchingTicket}
            totalPages={1}
            showLimit={false}
            showSearch={false}
          />
        </CardBody>
      </Card>
      <AddTicketModal refetchTicket={refetchTicket} {...addTicketModal} />
      <DeleteTicketModal
        refetchTicket={refetchTicket}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        {...deleteTicketModal}
      />
    </Fragment>
  );
};

export default TicketTab;
