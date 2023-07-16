// Integrated with Login API, in a separate page

import { Link } from 'react-router-dom';
import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import authService from "@/services/auth.service";

type Props = {};

type State = {
  redirect: string | null;
  roomId: string;
  roomPassword: string;
  loading: boolean;
  message: string;
};

export default class OnLogin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      redirect: null,
      roomId: "",
      roomPassword: "",
      loading: false,
      message: "",
    };
  }

  // redirect to /Dashboard if the login is successful
  // Documentation: https://legacy.reactjs.org/docs/react-component.html 
  componentDidMount() {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/Dashboard" });
    }
  }

  // componentWillUnmount(){
  //   window.location.reload();
  // }

  validationSchema() {
    return Yup.object().shape({
      roomId: Yup.string().required("This field is required!"),
      roomPassword: Yup.string().required("This field is rquuired!"),
    });
  }

  handleLogin(formValue: { roomId: string; roomPassword: string }) {
    const { roomId, roomPassword } = formValue;
    this.setState({
      message: "",
      loading: true,
    });

    authService.login(roomId, roomPassword).then(
      () => {
        this.setState({
          redirect: "/Dashboard",
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Link to={this.state.redirect} />;
    }

    const { loading, message } = this.state;

    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
    px-5 py-3 placeholder-white`;

    const initialValues = {
      roomId: "",
      roomPassword: "",
    };
    return (
      <section id="login" className="mx-auto w-5/6 pb-32 pt-24">
        <div className="justtify-between mt-10 gap-8 md:flex">
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
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
                {/* <label htmlFor="roomPassword"> PASSWORD </label> */}
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
              <button
                type="submit"
                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                disabled={loading}
              >
                LOGIN
              </button>
              {/* Backdoor to dashboard for dev */}
              <Link to="/dashboard">
                <button
                  type="submit"
                  className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                >
                  BYPASS
                </button>
              </Link>
              {message && (
                <div className="alert">
                  <div
                    className="rounded-t bg-red-500 px-4 py-2 font-bold text-white"
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </section>
    );
  }
}

