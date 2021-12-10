import Fade from "react-reveal/Fade";
import BackHeader from "../../../components/BackHeader";
import Card from "../../../components/Card";
import useAccounts from "../../../hooks/api/admin/useAccounts";
import { number } from "../../../App";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { auth, functions } from "../../../firebase";

const UsersOverview = () => {
  const { data: users, refetch } = useAccounts();

  const onAddUser = useCallback(() => {
    const firstname = window.prompt("Voornaam");
    const lastname = window.prompt("Achternaam");
    const email = window.prompt("Email");
    const addUser = functions.httpsCallable("createNewUser");

    addUser({ firstname, lastname, email })
      .then(() => {
        auth.sendPasswordResetEmail(email);
        window.alert("Nieuwe gebruiker aangemaakt!");
        refetch();
      })
      .catch("Er liep iets mis.");
  }, [refetch]);

  return (
    <>
      <BackHeader title="Gebruikers">
        <button onClick={onAddUser}>+</button>
      </BackHeader>
      <div className="flex flex-col space-y-2 mt-4 pb-4">
        {users?.map(
          ({ id, firstname, lastname, spent: _spent, paid: _paid }) => {
            const paid = _paid ?? 0;
            const spent = _spent ?? 0;
            return (
              <Fade cascade duration={300} key={id}>
                <Card>
                  <div className="flex justify-between">
                    <div className="">
                      {firstname} {lastname}
                    </div>
                    <div className="font-bold flex space-x-8">
                      <div>€ {number(spent - paid)}</div>
                      <Link
                        className="grid place-items-center text-accent"
                        to={`/users/${id}`}
                      >
                        <CgMoreO />
                      </Link>
                    </div>
                  </div>
                </Card>
              </Fade>
            );
          }
        )}
      </div>
    </>
  );
};

export default UsersOverview;
