import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getMemberTransactions = async () => {
    const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    isRefetching: isRefetchingTransaction,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["MemberTransaction", currentPage, currentLimit, currentSearch],
    queryFn: getMemberTransactions,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
  };
};

export default useTransaction;
