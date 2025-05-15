import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";
import orderServices from "@/services/order.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const useDetailEvent = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };
  const { data: dataDetailEvent } = useQuery({
    queryKey: ["DetailEventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataDetailEvent?._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: !!dataDetailEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataDetailEvent?._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  const createOrder = async () => {
    const { data } = await orderServices.createOrder(cart);
    return data.data;
  };

  const waitForSnap = (maxRetries = 10, delay = 300): Promise<void> => {
    return new Promise((resolve, reject) => {
      const check = () => {
        if (window.snap?.pay) {
          resolve();
        } else if (maxRetries <= 0) {
          reject(new Error("Midtrans Snap is not available."));
        } else {
          maxRetries--;
          setTimeout(check, delay);
        }
      };
      check();
    });
  };

  const { mutate: mutateCreateOrder, isPending: isPendingMutateCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: async (result) => {
        const token = result?.payment?.token;

        try {
          await waitForSnap(); // ✅ waits until `window.snap.pay` is ready
          window.snap?.pay(token);
        } catch {
          setToaster({
            type: "error",
            message: "Failed to initiate payment. Please try again.",
          });
        }
      },
    });

  return {
    dataDetailEvent,
    dataTicket,
    handleAddToCart,
    handleChangeQuantity,
    cart,
    dataTicketInCart,
    mutateCreateOrder,
    isPendingMutateCreateOrder,
  };
};

export default useDetailEvent;
