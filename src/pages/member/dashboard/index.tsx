import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";


const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      type="member"
      description="Dashboard Member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
