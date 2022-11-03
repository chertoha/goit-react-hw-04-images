const Button = ({ onClick, isLoading }) => {
  return (
    <button
      className="Button"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      Load more
    </button>
  );
};

export default Button;

///Prop types~!!!!!!!!!!!
