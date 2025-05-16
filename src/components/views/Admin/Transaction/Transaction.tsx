import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useTransaction from "./useTransaction";
import convertIDR from "@/utils/currency";
import DeleteTransactionModal from "./DeleteTransactionModal";

const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTransaction,
    isLoadingTransaction,
    refetchTransaction,
    isRefetchingTransaction,
    selectedId,
    setSelectedId,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  const deleteTransactionModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={cellValue === "completed" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "total":
          return convertIDR(Number(cellValue));
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/transaction/${transaction.orderId}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${transaction?.orderId}`);
                deleteTransactionModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, deleteTransactionModal, setSelectedId],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_TRANSACTION}
          data={dataTransaction?.data || []}
          emptyContent="Transaction is Empty"
          renderCell={renderCell}
          isLoading={isLoadingTransaction || isRefetchingTransaction}
          totalPages={dataTransaction?.pagination.totalPages}
        />
      )}
      <DeleteTransactionModal
        refetchTransaction={refetchTransaction}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        {...deleteTransactionModal}
      />
    </section>
  );
};

export default Transaction;
