import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";
import useCurrentUser from "../useCurrentUser";

const useTransfers = ({ userId }) => {
  const { id, scouts } = useCurrentUser();
  
  const { data, isLoading, error, refetch } = useQuery(
    `transfers${userId}`,
    async () =>
      querySnapshotToData(
        await db
          .collection("groups")
          .doc(scouts)
          .collection("transfers")
          .where("user", "==", userId ?? id)
          .orderBy("date", "desc")
          .get()
      )
  );

  return { data, isLoading, error, refetch };
};

export default useTransfers;
