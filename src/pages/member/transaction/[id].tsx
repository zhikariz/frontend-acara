import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const DetailTransactionMemberPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      type="member"
      description="Information for spesific transaction"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionMemberPage;
