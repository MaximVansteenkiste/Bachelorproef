import { useState } from "react";
import { useQuery } from "react-query";
import firebase, { db, querySnapshotToData } from "../firebase";
import useScoutsPreferences from "./api/useScoutsPreferences";

const useCurrentUser = () => {
  const [user, setUser] = useState(firebase.auth().currentUser ?? "loading");

  const { data, isLoading, error } = useQuery(
    "userData",
    async () => {
      const userData = await querySnapshotToData(
        await db.collection("users").doc(user.uid).get()
      );

      return { ...userData, id: user.uid };
    },
    { enabled: !!user?.uid }
  );
  const { scoutsPreferences, scoutsLoading } = useScoutsPreferences(
    data?.scouts
  );

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  if (user !== "loading" && (isLoading || scoutsLoading) && !error) {
    return { ...user, dataLoading: true };
  }

  if (data && scoutsPreferences) {
    return { ...user, ...scoutsPreferences, ...data };
  }

  return user;
};

export default useCurrentUser;
