const Button = ({ children, className = "", onClick, ...props }) => {
  
  return (
    <button className={`${className} font-bold`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
