import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";
import useCurrentUser from "../useCurrentUser";

const useYearHistory = () => {
  const { id, scouts } = useCurrentUser();
  const { data, isLoading, error } = useQuery("yearHistory", async () =>
    querySnapshotToData(
      await db
        .collection("users")
        .doc(id)
        .collection("statistics")
        .get()
    )
  );
  return {
    data,
    isLoading,
    error,
  };
};

export default useYearHistory;
