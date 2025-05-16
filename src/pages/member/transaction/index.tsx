import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const TransactionMemberPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      type="member"
      description="List of All Transaction"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionMemberPage;
