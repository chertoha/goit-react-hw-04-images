import PropTypes from 'prop-types';

const Button = ({ onClick, isLoading = false }) => {
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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
