import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      type="admin"
      description="List of All Transaction"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
