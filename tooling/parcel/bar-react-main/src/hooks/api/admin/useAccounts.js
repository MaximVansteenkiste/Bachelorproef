import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../../firebase";
import useCurrentUser from "../../useCurrentUser";

const useAccounts = () => {
  const { scouts } = useCurrentUser();
  const { data, isLoading, error, refetch } = useQuery(
    "users",
    async () =>
      querySnapshotToData(
        await db
          .collection("users")
          .where("scouts", "==", scouts)
          .where("firstname", "!=", "TestAccount")
          .orderBy("firstname")
          .orderBy("lastname")
          .get()
      ),
    { refetchOnMount: false, enabled: !!scouts }
  );

  return { data, isLoading, error, refetch };
};

export default useAccounts;
