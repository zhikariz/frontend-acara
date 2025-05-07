import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,

    refetchBanner,
    selectedId,
    setSelectedId,
  } = useBanner();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="image"
              width={300}
              height={200}
              className="rounded-lg"
            />
          );
        case "isShow":
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
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteBannerModal, setSelectedId],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_BANNER}
          data={dataBanner?.data || []}
          emptyContent="Banner is Empty"
          buttonTopContentLabel="Create Banner"
          onClickButtonTopContent={addBannerModal.onOpen}
          renderCell={renderCell}
          isLoading={isLoadingBanner || isRefetchingBanner}
          totalPages={dataBanner?.pagination.totalPages}
        />
      )}
      <AddBannerModal refetchBanner={refetchBanner} {...addBannerModal} />
      <DeleteBannerModal
        refetchBanner={refetchBanner}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        {...deleteBannerModal}
      />
    </section>
  );
};

export default Banner;
