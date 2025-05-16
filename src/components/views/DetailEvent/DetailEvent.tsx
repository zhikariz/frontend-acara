import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";

const DetailEvent = () => {
  const {
    dataDetailEvent,
    dataTicket,
    handleAddToCart,
    handleChangeQuantity,
    cart,
    dataTicketInCart,
    mutateCreateOrder,
    isPendingMutateCreateOrder,
  } = useDetailEvent();

  return (
    <div className="px-8 lg:px-0">
      <Skeleton
        className="h-4 w-1/4 rounded-lg"
        isLoaded={!!dataDetailEvent?.name}
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataDetailEvent?.name}
            className="mb-2 h-8 rounded-lg"
          >
            <h1 className="text-2xl font-semibold text-danger">
              {dataDetailEvent?.name}
            </h1>
          </Skeleton>
          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={
              !!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate
            }
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaClock width={16} />
              <p>
                {convertTime(dataDetailEvent?.startDate)} -{" "}
                {convertTime(dataDetailEvent?.endDate)}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={
              !!dataDetailEvent?.isOnline || !!dataDetailEvent?.location
            }
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaLocationDot width={16} />
              <p>
                {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataDetailEvent?.isOnline
                  ? ""
                  : ` - ${dataDetailEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-4 aspect-video w-full"
            isLoaded={dataDetailEvent?.banner}
          >
            <Image
              src={dataDetailEvent?.banner}
              alt={dataDetailEvent?.name}
              className="aspect-video w-full rounded-lg object-cover"
              height={1080}
              width={1920}
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton
                className="mt-2 h-32 w-full rounded-lg"
                isLoaded={!!dataDetailEvent?.description}
              >
                <p className="text-foreground-500">
                  {dataDetailEvent?.description}
                </p>
              </Skeleton>
            </Tab>
            <Tab key="ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => (
                  <DetailEventTicket
                    key={`${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket?._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingMutateCreateOrder}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
