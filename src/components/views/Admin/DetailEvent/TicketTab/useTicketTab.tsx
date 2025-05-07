import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(`${query.id}`);
    return data.data;
  };

  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
    selectedTicket,
    setSelectedTicket,
  };
};

export default useTicketTab;
