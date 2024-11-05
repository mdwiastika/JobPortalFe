import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import signUpImage from "/sign-up-banner.png";
import { useState } from "react";
import { Helmet } from "react-helmet";
export default function Login() {
  const [submitMessage, setSubmitMessage] = useState("");
  interface FormValues {
    email: string;
    password: string;
  }
  const loginHandler = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = { status: 200, data: values };
      if (response.status == 200) {
        setSubmitMessage(
          "Registration successful! Redirecting to login page..."
        );
        resetForm();
      } else {
        setSubmitMessage("Registration failed! Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Registration failed! Please try again.");
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <section className="min-h-[calc(100vh-65px)] relative flex justify-center items-center z-30">
      <Helmet>
        <title>JobWise | Login</title>
      </Helmet>
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
                      className="border border-blue-500 block w-full py-2 px-5 rounded-md"
                      name="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      type="password"
                      className="border border-blue-500 block w-full py-2 px-5 rounded-md"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Link to={"/forgot-password"} className="text-blue-700">
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-blue-700 text-white mt-4 rounded-md w-full"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <p className="mt-4 text-center">
                    Already have a account?{" "}
                    <Link to={"/login"} className="text-blue-700">
                      Sign In
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
          <p className="text-center mt-4 text-sm">
            {submitMessage && submitMessage}
          </p>
        </div>
        <div className="lg:w-1/3">
          <img src={signUpImage} alt="" className="mt-4 h-full" />
        </div>
      </div>
    </section>
  );
}
