import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent, useCallback } from "react";

const useChangeUrl = () => {
  const router = useRouter();

  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;

  const setUrl = useCallback(() => {
    const newQuery = {
      limit: currentLimit || LIMIT_DEFAULT,
      page: currentPage || PAGE_DEFAULT,
      search: currentSearch || "",
    };

    if (
      router.query.limit === newQuery.limit &&
      router.query.page === newQuery.page &&
      router.query.search === newQuery.search
    ) {
      return;
    }

    router.replace({
      pathname: router.pathname,
      query: newQuery,
    });
  }, [router, currentLimit, currentPage, currentSearch]);

  const setUrlExplore = useCallback(() => {
    const newQuery = {
      limit: currentLimit || LIMIT_DEFAULT,
      page: currentPage || PAGE_DEFAULT,
      category: currentCategory || "",
      isOnline: currentIsOnline || "",
      isFeatured: currentIsFeatured || "",
    };

    if (
      router.query.limit === newQuery.limit &&
      router.query.page === newQuery.page &&
      router.query.category === newQuery.category &&
      router.query.isOnline === newQuery.isOnline &&
      router.query.isFeatured === newQuery.isFeatured
    ) {
      return;
    }

    router.replace({
      pathname: router.pathname,
      query: newQuery,
    });
  }, [
    router,
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  ]);

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeCategory = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    setUrl,
    currentLimit,
    currentPage,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    setUrlExplore,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
  };
};

export default useChangeUrl;
