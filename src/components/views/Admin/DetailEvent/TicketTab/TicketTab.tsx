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
import { Key, ReactNode, useCallback } from "react";
import { TICKET_LIST_EVENT } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

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
    <Card className="w-full p-4">
      <CardHeader className="items-center justify-between">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Event Ticket</h1>
          <p className="w-full text-small text-default-400">
            Manage ticket of this event
          </p>
        </div>
        <Button color="danger">Add New Ticket</Button>
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
  );
};

export default TicketTab;
