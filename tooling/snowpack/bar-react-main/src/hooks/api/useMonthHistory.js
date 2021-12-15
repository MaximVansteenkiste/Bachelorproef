import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";
import useCurrentUser from "../useCurrentUser";

const useMonthHistory = ({ year }) => {
  const { id, scouts } = useCurrentUser();
  const { data, isLoading, error } = useQuery(`${year}Months`, async () =>
    querySnapshotToData(
      await db
        .collection("users")
        .doc(id)
        .collection("statistics")
        .doc(year)
        .collection("months")
        .get()
    ).sort((a, b) => Number(a.id) - Number(b.id))
  );
  return {
    data,
    isLoading,
    error,
  };
};

export default useMonthHistory;
