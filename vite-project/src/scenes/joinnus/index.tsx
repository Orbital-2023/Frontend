// TODO: fix known bug that form disappears after successful submission. Something to do with preventDefault but deals with updating states

// Import necessary dependencies and components
// import { Link } from 'react-router-dom';
import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import authService from "@/services/auth.service";

// Define the prop types for the component
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

// Define the component state interface
type State = {
  roomId: string;
  emails: string;
  roomPassword: string;
  successful: boolean;
  message: string;
};

// The main component class
export default class JoinUs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    // Initial state of the component
    this.state = {
      roomId: "",
      emails: "",
      roomPassword: "",
      successful: false,
      message: "",
    };
  }

  // Define the validation schema for the form fields
  validationSchema() {
    return Yup.object().shape({
      roomId: Yup.string()
        .test(
          "len",
          "The roomId must be between 3 and 20 characters.",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 20
        )
        .required("This field is required!"),

      roomPassword: Yup.string()
        .test(
          "len",
          "The roomPassword must be between 6 and 40 characters.",
          (val: any) =>
            val && val.toString().length >= 6 && val.toString().length <= 40
        )
        .required("This field is required!"),
      emails: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
    });
  }

  // Function to handle form submission
  handleRegister(formValue: {
    roomId: string;
    roomPassword: string;
    emails: string;
  }) {
    const { roomId, roomPassword, emails } = formValue;

    // Reset message and successful flags before the submission
    this.setState({
      message: "",
      successful: false,
    });

    // Call the authentication service to register the user
    authService.register(roomId, roomPassword, emails).then(
      (response) => {
        // On successful response, update the message and set successful flag to true
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        // On error response, set successful flag to false and update the error message
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const { setSelectedPage } = this.props;

    // Styles for the input fields
    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
    px-5 py-3 placeholder-white`;

    // Initial values for the form fields
    const initialValues = {
      roomId: "",
      roomPassword: "",
      emails: "",
    };

    return (
      <section id="joinus" className="mx-auto w-5/6 pb-32 pt-24">
        <motion.div
          onViewportEnter={() => setSelectedPage(SelectedPage.JoinUs)}
        ></motion.div>
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className="mt-10 text-primary-500">JOIN NOW</span> TO GET
            PLANNING
          </HText>
          <p className="my-5">
            Generate your unique Room ID, key in your room password and provide
            us with your Gmail Account to get started!
          </p>
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Formik component for handling form state and validation */}
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleRegister}
            >
              <Form>
                {/* Render the form fields and error messages */}
                {!successful && (
                  <div>
                    <div className={inputStyles}>
                      <Field
                        name="roomId"
                        type="text"
                        className="form-control"
                        placeholder="room id"
                      />
                      <ErrorMessage
                        name="roomId"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className={inputStyles}>
                      <Field
                        name="roomPassword"
                        type="password"
                        className="form-control"
                        placeholder="password"
                      />
                      <ErrorMessage
                        name="roomPassword"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className={inputStyles}>
                      <Field
                        name="emails"
                        type="email"
                        className="form-control"
                        placeholder="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Render the success or error message */}
                {message && (
                  <div className={inputStyles}>
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </motion.div>
        </div>
      </section>
    );
  }
}
