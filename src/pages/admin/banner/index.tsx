import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      type="admin"
      description="List of all Banners, create new banner, and manage existing banner"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
