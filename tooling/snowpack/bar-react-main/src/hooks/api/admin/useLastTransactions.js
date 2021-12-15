import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../../firebase";
import useCurrentUser from "../../useCurrentUser";

const date = new Date();
date.setHours(date.getHours() - 12);

const useLastTransactions = () => {
  const { scouts } = useCurrentUser();
  const { data, isLoading, error } = useQuery(
    "lastTransactions",
    async () =>
      querySnapshotToData(
        await db
          .collection("groups")
          .doc(scouts)
          .collection("transactions")
          .where("date", ">=", date)
          .orderBy("date", "desc")
          .get()
      ).filter((a) => a.user !== "AjbwcXUZcGaGRzVeEeHVNBy7fEz1"),
    { enabled: !!scouts }
  );

  return { data, isLoading, error };
};

export default useLastTransactions;
