import { useCallback } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/api/useLogin";
import useCurrentUser from "../../hooks/useCurrentUser";
import { MainContext } from "../../App";
import Card from "../../components/Card";
import Input from "../../components/Input";
import StyledButton from "../../components/StyledButton";
import firebase from "../../firebase";

const Login = ({ isPasswordForget = false }) => {
  const { setNotification } = useContext(MainContext);
  const { register, handleSubmit } = useForm();
  const { login } = useLogin();
  const history = useHistory();
  const user = useCurrentUser();

  if (user && user !== "loading") {
    history.push("/");
  }
  const onSubmit = useCallback(
    (data) => {
      if (isPasswordForget) {
        firebase
          .auth()
          .sendPasswordResetEmail(data.email)
          .then(() => {
            setNotification({
              message: "De mail is verstuurd",
              type: "success",
            });
            history.push("/login");
          })
          .catch(() =>
            setNotification({
              message: "Er liep iets mis",
            })
          );
        return;
      }
      login(data);
    },
    [history, isPasswordForget, login, setNotification]
  );

  return (
    <div className="mx-2 mt-2 space-y-2 grid grid-cols-1 md:place-items-center md:w-full">
      <Card
        title={isPasswordForget ? "Herstel wachtwoord" : "Login"}
        className="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              required
              name="email"
              register={register}
            />
            {isPasswordForget || (
              <Input
                type="password"
                placeholder="Wachtwoord"
                required
                name="password"
                register={register}
              />
            )}
          </div>
          <div className="flex justify-end mt-5 space-x-2 content-center">
            <Link
              className="text-xs font-light grid place-items-center"
              to={isPasswordForget ? "login" : "/passwordforget"}
            >
              <div>
                {isPasswordForget ? "Naar login" : "Wachtwoord vergeten?"}
              </div>
            </Link>
            <StyledButton type="submit">
              {isPasswordForget ? "Verstuur mail" : "Login"}
            </StyledButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
