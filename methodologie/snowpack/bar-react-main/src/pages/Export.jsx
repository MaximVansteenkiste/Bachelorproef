import { useCallback } from "react";
import firebase, { db, querySnapshotToData } from "../firebase";
import useAccounts from "../hooks/api/admin/useAccounts";
import useCurrentUser from "../hooks/useCurrentUser";
import React from 'react';
const Export = () => {
  const { data: accounts } = useAccounts();
  const { scouts } = useCurrentUser();

  const onClick = useCallback(async () => {
    accounts.forEach((a) => {
      if (!a.firstname) {
        db.collection("users").doc(a.id).delete();
      }
    });
  }, [accounts]);

  return <button onClick={onClick}>Do it</button>;
};

export default Export;
