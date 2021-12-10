import { useMutation } from "react-query";
import firebase, { db } from "../../../firebase";
import useCurrentUser from "../../useCurrentUser";

const useNewTransfer = ({ onSuccess }) => {
  const { id, scouts } = useCurrentUser();
  const { isSuccess, isLoading, isError, mutate, reset } = useMutation(
    (payment) =>
      db
        .collection("groups")
        .doc(scouts)
        .collection("transfers")
        .add({
          dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
          addedBy: id,
          ...payment,
        }),
    { onSuccess: onSuccess() }
  );

  return { isSuccess, isLoading, isError, addPayment: mutate, reset };
};

export default useNewTransfer;
