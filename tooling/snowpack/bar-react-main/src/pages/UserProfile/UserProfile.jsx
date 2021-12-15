import Fade from "react-reveal/Fade";
import { number, sugar } from "../../App";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import BackHeader from "../../components/BackHeader";
import CurrencyCard from "../../components/CustomCards/CurrencyCard";
import Card from "../../components/Card";
import Input from "../../components/Input";
import React from 'react';
const UserProfile = ({ canAddPayment, user, transfers, addPayment }) => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    if (window.confirm(`Nieuwe overschrijving van € ${data.amount}?`)) {
      const date = new Date(data.date);
      date.setHours(0, 0, 0);
      addPayment({ amount: Number(data.amount), date, user: user.id });
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <BackHeader title={`${user?.firstname} ${user?.lastname}`} />
      <div className="grid grid-cols-2 gap-2 h-20">
        <CurrencyCard amount={user.spent} subtitle="Uitgegeven" />
        <CurrencyCard
          amount={user?.spent - (user?.paid ?? 0)}
          subtitle="Schulden"
        />
      </div>
      <div className="text-xl font-extrabold mt-7">Overschrijvingen</div>

      <div className="flex flex-col space-y-2 mt-4 pb-4">
        {canAddPayment && (
          <Card>
            <div className="font-bold mb-2">Nieuwe overschrijving</div>
            <form className="flex" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-x-2 flex-grow">
                <Input
                  type="date"
                  placeholder="Datum"
                  name="date"
                  register={register}
                  required
                />
                <Input
                  type="number"
                  placeholder="Bedrag"
                  step=".01"
                  name="amount"
                  register={register}
                  required
                />
              </div>
              <button
                className="w-7 text-center font-extrabold text-accent"
                type="submit"
              >
                +
              </button>
            </form>
          </Card>
        )}
        {transfers?.map((p) => (
          <Fade cascade duration={300} key={p.id}>
            <Card>
              <div className="grid grid-cols-2">
                <div className="">
                  {sugar.Date.create(p.date.toDate()).medium()}
                </div>
                <div className="font-bold text-right">€ {number(p.amount)}</div>
              </div>
            </Card>
          </Fade>
        ))}
        {transfers?.length === 0 && (
          <div className="flex justify-center font-xs opacity-70 mt-3">
            Geen overschrijvingen
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
