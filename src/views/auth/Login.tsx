import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import signUpImage from "/sign-up-banner.png";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Input } from "@nextui-org/react";
import axiosInstance from "src/axiosInstance";
import GetUser from "src/components/GetUser";
export default function Login() {
  const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState("");
  interface FormValues {
    email: string;
    password: string;
  }
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);
  console.log(localStorage.getItem("access_token"));
  const loginHandler = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      console.log("masuk", values);
      const responseData = response.data;
      if (responseData.status == "success") {
        setSubmitMessage("Login successful! Redirecting to home page...");
        localStorage.setItem("access_token", responseData.data.token);
        resetForm();
        const user = await GetUser();
        if (
          user.roles[0].name == "admin" ||
          user.roles[0].name == "super_admin" ||
          user.roles[0].name == "recruiter"
        ) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setSubmitMessage("Login failed! Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Login failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="min-h-[calc(100vh-65px)] relative flex justify-center items-center z-30">
      <HelmetProvider>
        <Helmet>
          <title>JobWise | Login</title>
        </Helmet>
      </HelmetProvider>
      <div className="flex justify-center p-4 flex-col-reverse lg:flex-row z-30 shadow-md rounded-md max-h-[500px] bg-white/40 backdrop-blur-sm">
        <div className="lg:w-2/3">
          <div className="rounded-lg mt-4">
            <h2 className="text-xl lg:text-2xl font-medium mt-2 mx-4">
              Get Started Now
            </h2>
            <p className="mx-4">
              Enter your Credentials to login to your account
            </p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={loginHandler}
            >
              {({ isSubmitting }) => (
                <Form className="p-5">
                  <div className="mt-4">
                    <Field
                      type="text"
                      className="block w-full py-2 rounded-md"
                      name="email"
                      as={InputForm}
                      label="Email Address"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      type="password"
                      className="block w-full py-2 rounded-md"
                      name="password"
                      as={InputForm}
                      label="Password"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Link to={"/forgot-password"} className="text-blue-700">
                      Forgot Password?
                    </Link>
                  </div>
                  <p className="text-center mt-4 text-sm text-red-500">
                    {submitMessage}
                  </p>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-blue-700 text-white mt-4 rounded-md w-full"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <p className="mt-4 text-center">
                    Don't have a account?{" "}
                    <Link to={"/signup"} className="text-blue-700">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="lg:w-1/3">
          <img src={signUpImage} alt="" className="mt-4 h-full" />
        </div>
      </div>
    </section>
  );
}
const InputForm = (props: { label: string; type: string }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input {...props} />
    </div>
  );
};
