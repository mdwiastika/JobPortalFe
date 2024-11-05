import { useState } from "react";
import { Link } from "react-router-dom";
import signUpImage from "/sign-up-banner.png";
import { Field, Form, Formik, FormikHelpers } from "formik";
export default function Signup() {
  const [role, setRole] = useState("");
  const clickRoleHandler = (roleSelected: string) => {
    setRole(roleSelected);
    if (roleSelected == "job-seeker") {
      document.getElementById("choice-role")?.classList.add("hidden");
      document.getElementById("role-job-seeker")?.classList.remove("hidden");
      document.getElementById("role-recruiter")?.classList.add("hidden");
    } else if (roleSelected == "recruiter") {
      document.getElementById("choice-role")?.classList.add("hidden");
      document.getElementById("role-recruiter")?.classList.remove("hidden");
      document.getElementById("role-job-seeker")?.classList.add("hidden");
    } else {
      document.getElementById("role-job-seeker")?.classList.add("hidden");
      document.getElementById("role-recruiter")?.classList.add("hidden");
      document.getElementById("choice-role")?.classList.remove("hidden");
    }
  };
  interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: string;
  }
  const [submitMessage, setSubmitMessage] = useState("");
  const registerHandler = async (
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
  const FormRegister = () => {
    const formattedRole = role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return (
      <div className="flex justify-center p-4 flex-col-reverse lg:flex-row">
        <div className="lg:w-1/2">
          <span className="text-sm hidden lg:block">
            <Link to={"/signup"} className="text-blue-500">
              Sign Up
            </Link>{" "}
            / {formattedRole}
          </span>
          <div className="rounded-lg mt-4">
            <h2 className="text-xl lg:text-2xl font-medium mt-2 mx-4">
              Get Started Now
            </h2>
            <p className="mx-4">
              Enter your Credentials to Create your account
            </p>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                user_type: role,
              }}
              onSubmit={registerHandler}
            >
              {({ isSubmitting }) => (
                <Form className="p-5">
                  <div className="mt-4">
                    <Field
                      type="text"
                      className="border block w-full py-2 px-5 rounded-md"
                      name="first_name"
                      placeholder="FirstName"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      type="text"
                      className="border block w-full py-2 px-5 rounded-md"
                      name="last_name"
                      placeholder="LastName"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      type="text"
                      className="border block w-full py-2 px-5 rounded-md"
                      name="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      type="password"
                      className="border block w-full py-2 px-5 rounded-md"
                      name="password"
                      placeholder="Password"
                      required
                    />
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
        <div className="lg:w-1/2">
          <span className="text-sm lg:hidden">
            <Link to={"/signup"} className="text-blue-500">
              Sign Up
            </Link>{" "}
            / {formattedRole}
          </span>
          <img src={signUpImage} alt="" className="mt-4" />
        </div>
      </div>
    );
  };
  return (
    <section className="min-h-[calc(100vh-65px)] flex justify-center items-center shadow-lg p-4 flex-col">
      <div className="p-4 lg:p-8 shadow-md border" id="choice-role">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-[800px]">
          Join Now and Discover{" "}
          <span className="text-blue-500">Your Opportunities!</span>
        </h2>
        <p className="mt-6 max-w-[800px] text-lg">
          Join a growing community of professionals! Register as a Job Seeker to
          find job opportunities, or as a Recruiter to find top talent.
        </p>
        <div className="flex items-center justify-between">
          <div className="mt-8">
            <button
              onClick={() => clickRoleHandler("job-seeker")}
              className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border hover:border-blue-500 font-semibold py-2 px-4 transition duration-300"
            >
              Sign Up as Job Seeker
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={() => clickRoleHandler("recruiter")}
              className="text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-4 transition duration-300"
            >
              Sign Up as Recruiter
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 font-medium py-2 px-2">
            Log In
          </Link>
        </div>
      </div>
      <div id="role-job-seeker" className="p-4 lg:p-4 shadow-md border hidden">
        <FormRegister />
      </div>
      <div id="role-recruiter" className="p-4 lg:p-4 shadow-md border hidden">
        <FormRegister />
      </div>
    </section>
  );
}
