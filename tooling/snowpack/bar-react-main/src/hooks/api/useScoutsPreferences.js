import { useQuery } from "react-query";
import { db, querySnapshotToData } from "../../firebase";

const useScoutsPreferences = (scoutsId) => {
  const { data, isLoading } = useQuery(
    "scoutsData",
    async () =>
      querySnapshotToData(await db.collection("groups").doc(scoutsId).get()),
    { enabled: !!scoutsId }
  );

  return { scoutsPreferences: data, scoutsLoading: isLoading };
};

export default useScoutsPreferences;
