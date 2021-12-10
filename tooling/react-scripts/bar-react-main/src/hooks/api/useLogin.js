import { useContext } from "react";
import { useMutation } from "react-query";
import { MainContext } from "../../App";
import firebase from "../../firebase";

const useLogin = () => {
  const { setNotification } = useContext(MainContext);
  const { isLoading, isError, isSuccess, mutate, reset } = useMutation(
    async ({ email, password }) => {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() =>
          setNotification({ message: "Foute combinatie!", type: "error" })
        );
    }
  );

  return { isLoading, isError, isSuccess, login: mutate, resetLogin: reset };
};

export default useLogin;
