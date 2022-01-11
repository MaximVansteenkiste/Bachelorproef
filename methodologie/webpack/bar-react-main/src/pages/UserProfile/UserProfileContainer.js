import { useParams } from "react-router-dom";
import useAccounts from "../../hooks/api/admin/useAccounts";
import useCurrentUser from "../../hooks/useCurrentUser";
import UserProfile from "./UserProfile";
import usePayments from "../../hooks/api/useTransfers";
import useNewPayment from "../../hooks/api/admin/useNewTransfer";
import { useMemo } from "react";

const UserProfileContainer = () => {
  const { canAddPayment, ...user } = useCurrentUser();
  const { userId } = useParams();
  const { data: transfers, refetch: refetchPayments } = usePayments({ userId });

  if (userId) {
    return (
      <AdminContainer
        userId={userId}
        transfers={transfers}
        refetchPayments={refetchPayments}
        canAddPayment={canAddPayment}
      />
    );
  }

  return <UserProfile user={user} transfers={transfers} />;
};

const AdminContainer = ({
  refetchPayments,
  userId,
  transfers,
  canAddPayment,
}) => {
  const { data: users, refetch: refetchUsers } = useAccounts();
  const { addPayment } = useNewPayment({
    onSuccess: () => {
      refetchUsers();
      refetchPayments();
    },
  });

  const user = useMemo(
    () => users?.find((u) => u.id === userId),
    [userId, users]
  );

  return (
    <UserProfile
      user={user}
      canAddPayment={canAddPayment}
      transfers={transfers}
      addPayment={addPayment}
    />
  );
};

export default UserProfileContainer;
