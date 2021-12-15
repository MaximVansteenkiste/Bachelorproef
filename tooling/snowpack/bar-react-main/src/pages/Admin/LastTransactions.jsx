import Fade from "react-reveal/Fade";
import Card from "../../components/Card";
import useLastTransactions from "../../hooks/api/admin/useLastTransactions";
import { number, sugar } from "../../App";
import BackHeader from "../../components/BackHeader";
import useAccounts from "../../hooks/api/admin/useAccounts";
import React from 'react';
const LastTransactions = () => {
  const { data: transactions } = useLastTransactions();
  const { data: users } = useAccounts();

  return (
    <>
      <BackHeader title="Laatste 12 uur" />
      <div className="flex flex-col space-y-2 mt-4">
        {transactions?.map((t) => (
          <Fade cascade duration={300} key={t.id}>
            <Card>
              <div className="flex justify-between">
                <div className="">
                  {sugar.Date.create(t.date.toDate()).format("%R")}
                </div>
                <div className="font-bold">
                  {users?.find((u) => u.id === t.user)?.firstname ?? "..."}
                </div>
                <div className="font-bold">€ {number(t.amount)}</div>
              </div>
            </Card>
          </Fade>
        ))}
        {transactions?.length === 0 && (
          <div className="flex justify-center font-xs opacity-70 mt-3">
            Geen transacties
          </div>
        )}
      </div>
    </>
  );
};

export default LastTransactions;
