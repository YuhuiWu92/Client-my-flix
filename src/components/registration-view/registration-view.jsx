import React, { useState } from "react";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  };

  return (
    <form className="register-form">
      <label>
        Username:
        <input
          type="text"
          value={values.username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          placeholder="*******"
          value={values.password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={values.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Birthday:
        <input
          type="date"
          value={values.birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handleRegistration}>
        Sign up
      </button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
