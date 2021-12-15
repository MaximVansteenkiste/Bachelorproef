import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import StyledButton from "../../components/StyledButton";
import { db, querySnapshotToData } from "../../firebase";
import Fade from "react-reveal/Fade";
import Card from "../../components/Card";
import { number, sugar } from "../../App";
import useAccounts from "../../hooks/api/admin/useAccounts";

const CalculateSpent = () => {
  const { register, handleSubmit } = useForm();
  const [fetchedData, setFetchedData] = useState();
  const { data: users } = useAccounts();

  const fetch = useCallback(async (data) => {
    const start = new Date(data.start);
    const end = new Date(data.end);
    start.setHours(0, 0, 0);
    end.setHours(0, 0, 0);
    end.setDate(end.getDate() + 1);
    try {
      const transactions = querySnapshotToData(
        await db
          .collection("transactions")
          .where("date", ">=", start)
          .where("date", "<=", end)
          .orderBy("date", "desc")
          .get()
      ).filter((a) => a.user !== "AjbwcXUZcGaGRzVeEeHVNBy7fEz1");
      const sum = transactions.reduce((a, c) => a + c.amount, 0);
      setFetchedData({ sum, transactions });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(fetch)}
        className="flex justify-center align-middle gap-2 mb-3"
      >
        <Input
          type="date"
          placeholder="Begin"
          {...register("start")}
          required
        />
        <Input type="date" placeholder="Einde" {...register("end")} required />
        <StyledButton type="submit">Bereken</StyledButton>
      </form>
      {fetchedData && (
        <div className="flex flex-col space-y-2 mt-4 pb-4">
          <div className="text-xl font-extrabold mt-7">
            Transacties (totaal: €{number(fetchedData.sum)})
          </div>

          {fetchedData.transactions?.map((t) => (
            <Fade cascade duration={300} key={t.id}>
              <Card>
                <div className="grid grid-cols-3">
                  <div className="">
                    {sugar.Date.create(t.date.toDate()).format("%c")}
                  </div>
                  <div className="font-bold">
                    {users.find((u) => u.id === t.user)?.firstname ?? "..."}{" "}
                    {users.find((u) => u.id === t.user)?.lastname ?? "..."}
                  </div>
                  <div className="font-bold text-right">
                    € {number(t.amount)}
                  </div>
                </div>
              </Card>
            </Fade>
          ))}
          {fetchedData.transactions.length === 0 && (
            <div className="flex justify-center font-xs opacity-70 mt-3">
              Geen transacties
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CalculateSpent;
