import styles from "./Input.module.css";

const Input = ({ id, placeholder, onChange, type = "text" }, value) => {
  return (
    <input
      type={type}
      value={value}
      className={styles.search__input}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
    />
  );
};

export default Input;
