import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import styles from "./Login.module.css";
import Button from "../../../shared/ui/Button/Button";
import Input from "../../../shared/ui/Input/Input";
import { authAxios, setAuthTokens } from "../../../shared/utils/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { isAuthenticated } = useSelector((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAxios.post("/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      setAuthTokens(accessToken, refreshToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { username },
      });

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message,
      });
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
        <div className={styles.switch}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
