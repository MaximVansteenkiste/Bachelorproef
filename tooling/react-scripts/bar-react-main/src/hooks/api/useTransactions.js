import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";
import useCurrentUser from "../useCurrentUser";

const useTransactions = ({ key, startDate, endDate = new Date() }) => {
  const { id, scouts } = useCurrentUser();
  if (key !== "last12Hours") {
    startDate.setHours(0, 0, 0);
    endDate.setHours(0, 0, 0);
  }
  
  const { data, isLoading, error } = useQuery(key, async () => {
    const data = querySnapshotToData(
      await db
        .collection("groups")
        .doc(scouts)
        .collection("transactions")
        .where("user", "==", id)
        .where("date", ">=", startDate)
        .where("date", "<", endDate)
        .orderBy("date", "desc")
        .get()
    );
    const sum = data.reduce((acc, curr) => acc + curr.amount, 0);

    return { transactions: data, sum };
  }, {enabled: !!id });
  return {
    data,
    isLoading,
    error,
  };
};

export default useTransactions;
