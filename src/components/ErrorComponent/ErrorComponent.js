import PropTypes from 'prop-types';

const ErrorComponent = ({ title = '', text = '', children }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{title}</h2>
      <p>{text} </p>
      {children}
    </div>
  );
};

ErrorComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default ErrorComponent;
