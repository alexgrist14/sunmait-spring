import Input from "../Input/Input";
import styles from "./FormField.module.css";

const FormField = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.input__container}>
      <label htmlFor={id}>{label}:</label>
      <div>
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          hasError={!!error}
        />
        <div className={styles.error}>{error || " "}</div>
      </div>
    </div>
  );
};

export default FormField;
