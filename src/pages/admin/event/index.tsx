import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      type="admin"
      description="List of all Events, create new event, and manage existing events"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
