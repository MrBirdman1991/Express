import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import axios from "../../utils/axios.instance";
import { AxiosError } from "axios";
import {useRouter} from "next/router"

type CreateUserInput = TypeOf<typeof createUserSchema>;

const createUserSchema = object({
  name: string({
    required_error: "Name is required",
  }).min(3, "Name to short min 3 chars"),
  password: string({
    required_error: "password is required",
  }).min(6, "Password too short - should be 6 chars"),
  passwordConfirmation: string({
    required_error: "password is required",
  }).min(6, "Password too short - should be 6 chars"),
  email: string({
    required_error: "Email is required",
  }).email("not valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

function RegisterPage() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  

  async function onSubmitHandler(values: CreateUserInput) {
    try {
      const {data} = await axios.post("/users", values);
      router.push("/");
    } catch (err) {
      const error = err as AxiosError;
      setRegisterError(error.message);
    }
  }

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Confirm password</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="*********"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}

export default RegisterPage;
