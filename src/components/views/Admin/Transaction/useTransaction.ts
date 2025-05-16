import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTransaction = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getAdminTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getOrders(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    isRefetching: isRefetchingTransaction,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["AdminTransaction", currentPage, currentLimit, currentSearch],
    queryFn: getAdminTransactions,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
    selectedId,
    setSelectedId,
  };
};

export default useTransaction;
