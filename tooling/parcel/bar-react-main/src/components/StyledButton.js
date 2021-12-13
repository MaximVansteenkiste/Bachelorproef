import Button from "./Button";

const StyledButton = ({ children, className = "", ...props }) => {
  return (
    <Button
      className={
        "px-2 py-1 bg-accent text-background rounded-md text-lg font-bold " +
        className
      }
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
