import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Card from "./Card";
import Input from "./Input";
import Fade from "react-reveal/Fade";
import Button from "./Button";
import { AiFillEdit } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";

const PeopleOverview = ({
  people,
  hasDelete = false,
  onDelete,
  hasEdit = false,
  onEdit,
  hasSelect = false,
  onSelectionDone,
}) => {
  const { register, watch } = useForm();
  const [selectedPeople, setSelectedPeople] = useState();
  const filteredPeople = useMemo(
    () =>
      watch("search")?.length > 0
        ? people?.filter(
            (p) =>
              p.firstname
                .toLowerCase()
                .includes(watch("search").toLowerCase()) ||
              p.lastname
                .toLowerCase()
                .includes(watch("search").toLowerCase()) ||
              p.type?.toLowerCase().includes(watch("search").toLowerCase())
          )
        : people,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch, watch("search"), people]
  );

  return (
    <div className="px-2 flex flex-col space-y-2">
      <div className="flex space-x-4 pr-4">
        <Input placeholder="Zoek op naam of functie" {...register("search")} />
        <Button
          onClick={() =>
            setSelectedPeople((prev) => (prev.length > 0 ? [] : filteredPeople))
          }
          className="w-5"
        >
          <BiSelectMultiple />
        </Button>
      </div>
      {filteredPeople?.map((p, i) => (
        <Fade duration={300} key={`${p.id}${i}`}>
          <Card>
            <div className="flex justify-between">
              <div>
                {p.firstname.toLowerCase().capitalize()}{" "}
                {p.lastname.toLowerCase().capitalize()}
                {p.type ? ` - ${p.type}` : ""}
              </div>
              <div className="flex space-x-3">
                {hasEdit && (
                  <Button onClick={() => onEdit(p)}>
                    <AiFillEdit />
                  </Button>
                )}
                {hasDelete && (
                  <div className="w-5">
                    <input
                      className="bg-black"
                      checked={selectedPeople?.find((e) => e.id === p.id)}
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedPeople((prev) => {
                          if (e.target.checked) {
                            if (prev?.length > 0) {
                              return [...prev, p];
                            }
                            return [p];
                          }
                          return prev.filter((s) => s.id !== p.id);
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Fade>
      ))}
      {filteredPeople && (
        <div className="flex justify-center text-sm opacity-75 pb-5">
          {filteredPeople.length}{" "}
          {filteredPeople.length === 1 ? "lid" : "leden"}
        </div>
      )}
      {selectedPeople?.length > 0 && hasDelete && (
        <Button
          className="fixed right-5 bottom-10"
          onClick={() => {
            selectedPeople.forEach((p) => {
              onDelete(p.id);
              setSelectedPeople((prev) => prev.filter((s) => s.id !== p.id));
            });
          }}
        >
          <div className="text text-white bg-red-600 rounded-xl grid place-items-center px-3 py-2">
            Verwijder {selectedPeople.length}{" "}
            {selectedPeople.length > 1 ? "leden" : "lid"}
          </div>
        </Button>
      )}
      {selectedPeople?.length > 0 && hasSelect && (
        <Button className="fixed right-5 bottom-10" onClick={() => {}}>
          <div className="text text-white bg-accent rounded-xl grid place-items-center px-3 py-2">
            Voeg toe
          </div>
        </Button>
      )}
    </div>
  );
};

export default PeopleOverview;
