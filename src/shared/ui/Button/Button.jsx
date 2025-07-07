import classNames from "classnames";
import styles from "./Button.module.css";

const Button = ({ children, color, className }) => {
  return (
    <div className={styles.container}>
      <button
        className={classNames(
          styles.button,
          className,
          styles[`button_${color}Color`]
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
