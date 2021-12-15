import { Listbox } from "@headlessui/react";
import { MdExpandMore } from "react-icons/md";
import Fade from "react-reveal/Fade";
import React from 'react';
const Selector = ({ selected, setSelected, options, title }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full pb-2 text-left rounded shadow-md cursor-default focus:outline-none">
          <span className="text-center flex justify-center">
            <div className="truncate">{selected.name}</div>
            <MdExpandMore className="place-self-center flex-shrink-0" />
          </span>
        </Listbox.Button>
        <Fade>
          <div className="absolute w-full py-1 mt-1">
            <Listbox.Options className="w-3/4 mx-auto overflow-auto text-base bg-card-light rounded-md shadow-lg max-h-60 flex flex-col divide-y-2 divide-gray-600">
              <div className="flex text-tile p-2 font-bold justify-center">
                {title}
              </div>
              {options.map((o, i) => (
                <Listbox.Option
                  key={i}
                  className="cursor-default select-none relative flex justify-center py-1 font-normal"
                  value={o}
                >
                  {o.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Fade>
      </div>
    </Listbox>
  );
};

export default Selector;
