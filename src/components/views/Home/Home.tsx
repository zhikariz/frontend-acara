import { Skeleton } from "@heroui/react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeEventList from "./HomeEventList";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />

      <HomeEventList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />

      <Skeleton
        className="mb-16 h-[20vw] w-full rounded-2xl px-6 lg:px-0"
        isLoaded={!isLoadingBanners}
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          width={1920}
          height={800}
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
        />
      </Skeleton>

      <HomeEventList
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />

      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
