import { useState } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.scss";

// New pattern
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // setting state formFields with defaultFormFields
  const { displayName, email, password, confirmPassword } = formFields; // Pulling values from this state

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents default behaviour of the form
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, user already in use");
      }
      console.log("User creation encountered an error", error);
    }
  };

  const handleChange = (event) => {
    // handleChange -> formField -> value
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          //   value="Mohs"
          value={displayName}
        />

        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          //   value="mohs@email.com"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          //   value="1"
        />

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          //   value="1"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
