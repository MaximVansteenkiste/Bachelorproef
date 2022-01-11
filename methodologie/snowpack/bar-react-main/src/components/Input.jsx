import React from 'react';
const Input = ({
  className = "",
  icon,
  register = () => {},
  name = "",
  ...props
}) => {
  return (
    <div className="relative w-full h-8">
      <input
        {...props}
        className={
          "rounded-md bg-card-lighter px-2 w-full h-full focus:ring-2 focus:ring-accent focus:border-transparent outline-none " +
          className
        }
        name={name}
        {...register(name)}
      ></input>
      {icon && (
        <div className="absolute right-2 top-0 h-full grid place-items-center">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;
