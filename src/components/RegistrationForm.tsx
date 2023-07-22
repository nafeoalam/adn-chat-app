import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/register", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input type="text" {...register("username")} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
