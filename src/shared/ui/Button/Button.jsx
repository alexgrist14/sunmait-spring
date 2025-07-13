import classNames from "classnames";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ children, color, className }) => {
  return (
    <button
      className={classNames(
        styles.button,
        className,
        styles[`button_${color}Color`]
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  className: PropTypes.string,
};

export default Button;
