import styles from "./Input.module.css";

const Input = ({ id, placeholder, onChange, type = "text" }) => {
  return (
    <input
      type={type}
      className={styles.search__input}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
    />
  );
};

export default Input;
