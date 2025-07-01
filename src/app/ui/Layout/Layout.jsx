import Header from "./components/Header/Header";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
