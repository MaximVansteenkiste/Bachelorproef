import { useCallback, useMemo } from "react";
import { FaHistory, FaUserCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import DropDown from "../../../components/DropDown";
import { auth } from "../../../firebase";
import useCurrentUser from "../../../hooks/useCurrentUser";
import React from 'react';
const debtAlertText = (debt, billingNumber) =>
  debt > 0
    ? `Schulden afbetalen doet u door € ${debt} over te schrijven naar ${billingNumber}.`
    : `U heeft momenteel geen schulden maar kan altijd extra overschrijven naar ${billingNumber}.`;

const Header = () => {
  const { isAdmin, spent = 0, paid = 0, billingNumber } = useCurrentUser();
  const history = useHistory();
  const debt = spent - paid;
  const onPayDebt = useCallback(() => {
    navigator?.clipboard && navigator.clipboard.writeText(billingNumber);
    window.alert(
      `${debtAlertText(debt, billingNumber)} ${
        navigator?.clipboard ? "\n\nHet rekeningnummer werd gekopieerd." : ""
      }`
    );
  }, [debt, billingNumber]);

  const userActions = useMemo(() => {
    const actions = [
      {
        label: "Betaal schulden",
        onClick: onPayDebt,
      },
      {
        label: "Overschrijvingen",
        onClick: () => history.push("/me"),
      },
      {
        label: "Afmelden",
        onClick: () => {
          auth.signOut().then(() => window.location.reload());
        },
      },
    ];

    if (isAdmin) {
      actions.splice(2, 0, {
        label: "Alle gebruikers",
        onClick: () => history.push("/users"),
      });
    }

    return actions;
  }, [history, isAdmin, onPayDebt]);

  return (
    <div className="h-10 flex justify-between pb-2 px-2">
      {isAdmin ? (
        <DropDown
          position="right"
          className="w-36"
          Initiator={<FaHistory className="text-xl text-accent mr-6" />}
          actions={[
            {
              label: "Mijn geschiedenis",
              onClick: () => history.push("/history"),
            },
            {
              label: "Laatste 12 uur",
              onClick: () => history.push("/lastTransactions"),
            },
          ]}
        />
      ) : (
        <Link to="/history" className="grid place-items-center">
          <FaHistory className="text-xl text-accent" />
        </Link>
      )}
      <DropDown
        position="left"
        Initiator={<FaUserCircle className="text-xl text-accent ml-6" />}
        actions={userActions}
      />
    </div>
  );
};

export default Header;
