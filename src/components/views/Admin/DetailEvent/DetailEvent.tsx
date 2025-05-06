import { Tab, Tabs } from "@heroui/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();
  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdate={handleUpdateLocation}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
