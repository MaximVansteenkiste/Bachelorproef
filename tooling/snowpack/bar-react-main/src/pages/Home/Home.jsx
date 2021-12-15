import { useState } from "react";
import { number } from "../../App";
import CurrencyCard from "../../components/CustomCards/CurrencyCard";
import Loading from "../../components/Loading";
import useCheckout from "../../hooks/api/useCheckout";
import useCurrentUser from "../../hooks/useCurrentUser";
import Slide from "@material-ui/core/Slide";
import StyledButton from "../../components/StyledButton";
import Header from "./partials/Header";
import useTransactions from "../../hooks/api/useTransactions";
import OtherPersonSelector from "./partials/OtherPersonSelector";

const date = new Date();
date.setHours(date.getHours() - 12);

const Home = () => {
  const {
    isAdmin,
    multiplier,
    multiplierName,
    multiplierNamePlural,
    ...currentUser
  } = useCurrentUser();
  const isOnline = window.navigator.onLine;

  const [amountMultiplier, setAmountMultiplier] = useState(multiplier);
  const [checkoutSheet, setCheckoutSheet] = useState();
  const [numberInput, setNumberInput] = useState(1);
  const [selectedUser, setSelectedUser] = useState(currentUser);

  const { data: last12Hours } = useTransactions({
    key: "last12Hours",
    startDate: date,
  });

  const {
    checkout,
    isLoading: isCheckoutLoading,
    isSuccess: isCheckoutSuccess,
  } = useCheckout({
    user: selectedUser,
    onSuccess: () => {
      setCheckoutSheet(false);
    },
  });

  const onCheckout = () => {
    checkout(Number(numberInput) * amountMultiplier);
  };

  return (
    <>
      <div
        onClick={() => {
          if (checkoutSheet) setCheckoutSheet(false);
        }}
        className="grid grid-cols-1 grid-rows-3 h-full w-full"
      >
        <div>
          <Header />
          <div className="grid grid-cols-2 gap-2 h-20">
            <CurrencyCard
              amount={last12Hours?.sum}
              subtitle="Laatste 12 uur"
              flash={
                isCheckoutSuccess &&
                (selectedUser.uid || selectedUser.id) === currentUser.uid
              }
            />
            <CurrencyCard
              amount={currentUser?.spent - (currentUser?.paid ?? 0)}
              subtitle="Schulden"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <input
            placeholder="0"
            min="1"
            type="number"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="bg-transparent text-center self-center text-7xl mb-5"
          />
          {isAdmin && (
            <div className="flex justify-center">
              <OtherPersonSelector
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>
          )}
        </div>
        <div className="w-full grid place-items-center">
          <div className="grid grid-cols-1 gap-4">
            <button
              className="text-xs text-yellow opacity-70"
              onClick={() =>
                setAmountMultiplier((prev) => (prev === 1 ? multiplier : 1))
              }
            >
              {amountMultiplier === 1
                ? "€"
                : Number(numberInput) > 1
                ? multiplierNamePlural
                : multiplierName}
            </button>
            <StyledButton
              onClick={() => setCheckoutSheet(true)}
              disabled={Number(numberInput) <= 0 || !isOnline}
              className="text-2xl z-10"
            >
              BETAAL
            </StyledButton>
          </div>
        </div>
      </div>
      <Slide direction="up" in={checkoutSheet} mountOnEnter unmountOnExit>
        <button
          className="bg-green h-44 w-screen fixed bottom-0 left-0 z-10 grid place-items-center"
          disabled={
            isCheckoutLoading ||
            isCheckoutSuccess ||
            !checkoutSheet ||
            !isOnline
          }
          onClick={onCheckout}
        >
          {isCheckoutLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="text-5xl font-bold opacity-70">
                € {number(Number(numberInput) * amountMultiplier)}
              </div>
              {(selectedUser?.uid || selectedUser?.id) !== currentUser?.uid && (
                <div className="pt-2">Voor {selectedUser.firstname}</div>
              )}
            </div>
          )}
        </button>
      </Slide>
    </>
  );
};

export default Home;
