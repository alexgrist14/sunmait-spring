import { useState } from "react";
import classnames from "classnames";
import { SvgLogo } from "../../../../../shared/svg/Logo/SvgLogo";
import styles from "./Header.module.css";
import { navItemsData } from "../../../../../shared/mock/data";
import Dropdown from "../../../../../shared/ui/Dropdown/Dropdown";
import classNames from "classnames";
import Button from "../../../../../shared/ui/Button/Button";
import { removeAuthTokens } from "../../../../../shared/utils/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Header = () => {
  const [openedItem, setOpenedItem] = useState(null);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (index, e) => {
    e.stopPropagation();

    if (openedItem === index) {
      setOpenedItem(null);
    } else {
      setOpenedItem(index);
    }
  };

  const handleLogout = () => {
    removeAuthTokens();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav id="header" className={classnames(styles.navbar, "container")}>
        <div className={styles.navbar__brand}>
          <SvgLogo className={styles.logo} />
        </div>
        <div
          className={classNames(styles.navbar__menu, {
            [styles.open]: isMobileMenu,
          })}
        >
          {navItemsData.map((item, index) => (
            <div
              className={classNames(styles.navbar__item, {
                [styles.opened]: openedItem === index,
              })}
              key={item.title}
              onClick={(e) => handleItemClick(index, e)}
            >
              <span>{item.title}</span>
              <Dropdown
                dropdownItems={item.dropdown}
                className={classNames(styles.dropdown, {
                  [styles.opened]: openedItem === index,
                })}
              />
            </div>
          ))}
          <Button
            className={styles.button}
            color="green"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div
          className={classNames(styles.navbar__burger, {
            [styles.active]: isMobileMenu,
          })}
          onClick={() => setIsMobileMenu((prev) => !prev)}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
