import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        // case "banner":
        //   return (
        //     <Image
        //       className="aspect-video w-36 object-cover rounded-lg"
        //       src={`${cellValue}`}
        //       alt="icon"
        //       width={200}
        //       height={100}
        //     />
        //   );
        case "isPublish":
          return (
            <Chip
              color={cellValue === true ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Unpublished"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteEventModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_EVENT}
          data={dataEvent?.data || []}
          emptyContent="Event is Empty"
          buttonTopContentLabel="Create Event"
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          isLoading={isLoadingEvent || isRefetchingEvent}
          totalPages={dataEvent?.pagination.totalPages}
        />
      )}
      <AddEventModal refetchEvent={refetchEvent} {...addEventModal} />
      {/* <DeleteCategoryModal */}
      {/*   refetchCategory={refetchCategory} */}
      {/*   selectedId={selectedId} */}
      {/*   setSelectedId={setSelectedId} */}
      {/*   {...deleteCategoryModal} */}
      {/* /> */}
    </section>
  );
};

export default Event;
