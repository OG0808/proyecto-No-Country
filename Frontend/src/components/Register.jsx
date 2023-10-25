import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../style/loginAndRegister.css";
import { motion }from "framer-motion"



const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      await signup(user.email, user.password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <motion.div
    className="register"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}>
      {error && <p>{error}</p>}
      <form className="register__form" onSubmit={handleSubmit}>
      <label className="register__label" htmlFor="email">Email</label>
      <input
      className="register__input"
        onChange={handleChange}
        type="email"
        name="email"
        placeholder="email@email.com"
      />
      <label className="register__label" htmlFor="password">password</label>
      <input
      className="register__input"
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
        placeholder="******"
      />
      <button className="register__button--submit">Register</button>
    </form>
    </motion.div>
  );
};

export default Register;
