import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { axiosInstance } from "../services/api-client";

const schema = z
  .object({
    first_name: z.string().min(3, { message: "atleast 3 characters" }),
    last_name: z.string().min(3, { message: "atleast 3 characters" }),
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(5, {
        message:
          "atleast 4 characters and characters must contain upper,lower,numbers and special characters",
      })
      .max(10, { message: "maximum upto 10" })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/,
        "the username must contain uppper,lower,numbers and special characters"
      ),
    confirm_password: z
      .string()
      .min(5, {
        message:
          "atleast 4 characters and characters must contain upper,lower,numbers and special characters",
      })
      .max(10, { message: "maximum upto 10" })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/,
        "the username must contain uppper,lower,numbers and special characters"
      ),
    details: z.string().min(3, { message: "atleast 3 characters" }).max(4),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // const handleRegister = async (data) => {
  //   try {
  //     const response = await axiosInstance.post("/register", data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="max-w-[100%] h-[120vh] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-ascent-2">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Register
            </h1>
          </div>

          <div className="mt-12 ">
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
                // handleRegister(data);
                reset({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                });
              })}
            >
              <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <label
                      htmlFor="hs-firstname-hire-us-2"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      {...register("firstName")}
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                    {errors.firstName && (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="hs-lastname-hire-us-2"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      {...register("lastName")}
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                    {errors.lastName && (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hs-work-email-hire-us-2"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <label
                      htmlFor="hs-company-hire-us-2"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Paswword
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      {...register("password")}
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="hs-company-website-hire-us-2"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      name="confirm_password"
                      id="confirm_password"
                      {...register("confirm_password")}
                      type="password"
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                    {errors.confirm_password && (
                      <p className="text-red-500">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-center text-white transition bg-blue-600 border border-transparent rounded-md gap-x-3 hover:bg-blue-700 lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
