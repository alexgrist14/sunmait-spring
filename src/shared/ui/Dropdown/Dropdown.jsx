import styles from "./Dropdown.module.css";

const Dropdown = ({ dropdownItems, className }) => {
  return (
    <ul className={className}>
      {dropdownItems.map((item) => (
        <li key={item.href}>
          <a className={styles.dropdown__item} href={item.href}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
