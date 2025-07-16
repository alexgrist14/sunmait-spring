import classNames from "classnames";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ children, color, className, onClick }) => {
  return (
    <button
      className={classNames(
        styles.button,
        className,
        styles[`button_${color}Color`]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
