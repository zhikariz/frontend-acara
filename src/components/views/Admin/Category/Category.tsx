import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,

    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={`${cellValue}`}
              alt="icon"
              width={100}
              height={200}
              priority
            />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteCategoryModal, setSelectedId],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          emptyContent="Category is Empty"
          buttonTopContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          isLoading={isLoadingCategory || isRefetchingCategory}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        refetchCategory={refetchCategory}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        {...deleteCategoryModal}
      />
    </section>
  );
};

export default Category;
