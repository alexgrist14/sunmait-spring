import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state);

  const [localLogin, setLocalLogin] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (localLogin === "admin" && localPassword === "1234") {
      dispatch({ type: "LOGIN_SUCCESS" });
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <label htmlFor="login">Username:</label>
          <Input
            id="login"
            type="text"
            value={localLogin}
            onChange={(e) => {
              setLocalLogin(e.target.value);
              dispatch({ type: "SET_LOGIN", payload: e.target.value });
            }}
          />
        </div>
        <div className={styles.input__container}>
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            type="password"
            value={localPassword}
            onChange={(e) => {
              setLocalPassword(e.target.value);
              dispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <Button color={"green"} className={styles.button}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
