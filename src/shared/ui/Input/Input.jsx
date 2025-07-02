import styles from "./Input.module.css";

const Input = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      className={styles.search__input}
      placeholder={placeholder}
      id="projectSearch"
      onChange={onChange}
    />
  );
};

export default Input;
