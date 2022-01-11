import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import firebase, { db } from "../../firebase";
import useCurrentUser from "../useCurrentUser";

const useCheckout = ({ user, onSuccess }) => {
  const { id, scouts } = useCurrentUser();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({});
  
  const checkout = useCallback(
    (amount) => {
      setStatus({ isLoading: true });
      return db
        .collection("groups")
        .doc(scouts)
        .collection("transactions")
        .add({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.uid || user.id,
          amount,
          bartender: id,
        })
        .then(() => {
          setStatus({ isSuccess: true });
          if ((user.uid || user.id) === id) {
            // firebase.analytics.logEvent("new_payment");
            queryClient.setQueryData("last12Hours", (oldData) => ({
              sum: oldData.sum + amount,
              transactions: [...oldData.transactions, { amount: amount }],
            }));
            queryClient.setQueryData("userData", (oldData) => ({
              ...oldData,
              spent: oldData.spent + amount,
            }));
          } else {
            window.alert(`Nieuwe transactie voor ${user.firstname}!`);
          }
          onSuccess();
        })
        .catch((e) => {
          window.alert("Er liep iets mis. Probeer het opnieuw!");
          console.log(e);
        })
        .finally(() => setStatus());
    },
    [id, onSuccess, queryClient, scouts, user.firstname, user.id, user.uid]
  );

  return { ...status, checkout };
};

export default useCheckout;
