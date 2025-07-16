import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import styles from "./SignUp.module.css";
import { authAxios, setAuthTokens } from "../../../shared/utils/auth";
import Button from "../../../shared/ui/Button/Button";
import FormField from "../../../shared/ui/FormField/FormField";

const SignUp = () => {
  const formFields = {
    username: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    age: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state);
  const [errors, setErrors] = useState(formFields);
  const [formData, setFormData] = useState(formFields);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      age: "",
    });
    try {
      const response = await authAxios.post("/signup", formData);
      const { accessToken, refreshToken } = response.data;
      setAuthTokens(accessToken, refreshToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { username: formData.username },
      });

      navigate("/");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors((prev) => ({
          ...prev,
          ...error.response.data.errors,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          _general: error.response?.data?.message || "Something went wrong",
        }));
      }
    }
  };

  const fields = [
    { id: "username", label: "Username", type: "text" },
    { id: "password", label: "Password", type: "password" },
    { id: "repeatPassword", label: "Repeat Password", type: "password" },
    { id: "firstName", label: "First Name", type: "text" },
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "age", label: "Age", type: "number" },
  ];

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.id}
            label={field.label}
            id={field.id}
            name={field.id}
            type={field.type}
            value={formData[field.id]}
            onChange={handleChange}
            error={errors[field.id]}
          />
        ))}

        <Button color="green" className={styles.button}>
          Sign Up
        </Button>

        <div className={styles.switch}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
