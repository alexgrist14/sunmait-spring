import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const auth = () => {
    axios
      .post("http://localhost:3111/api/login", {
        username: username,
        password: password,
      })
      .then(() => dispatch({ type: "LOGIN_SUCCESS" }))
      .catch(() => dispatch({ type: "LOGIN_FAILURE" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <label htmlFor="login">Username:</label>
          <Input
            id="login"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              dispatch({ type: "SET_LOGIN", payload: e.target.value });
            }}
          />
        </div>
        <div className={styles.input__container}>
          <label htmlFor="password">Password:</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
          />
        </div>
        <Button color={"green"} className={styles.button}>
          Log In
        </Button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
