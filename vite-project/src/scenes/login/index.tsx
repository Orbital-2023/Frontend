import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useContext, useState} from 'react'
import { UserContext } from "@/services/userContext";

const Login = () => {
  const userContext = useContext(UserContext)
  const initialValues = {
    roomId: "",
    roomPassword: "",
  };

  const validationSchema = Yup.object({
    roomId: Yup.string().required("Required"),
    roomPassword: Yup.string().required("Required"),
  });
  
  // State to track the loading state
  const [loading, setLoading] = useState(false);

  // Function to simulate the delay
  const addDelay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      // Start loading state
      setLoading(true);

      const response = await axios.post("/api/login", values);
      console.log(values);
      userContext.setUser({
        roomId: values.roomId,
        roomPassword: values.roomPassword,
      });

      setLoading(false);
      console.log(response.data); // Handle the response as needed
      // Add a delay of 3 seconds to help with the backend coming back online
      await addDelay(3000); 

      navigate("/dashboard"); // Redirect to /dashboard upon successful login
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "An error occurred";
      console.log(errorMessage);    }
  };
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
    px-5 py-3 placeholder-white`;

  return (
    <div>
      <h1>LOGIN</h1>
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {
                <div>
                  <div className={inputStyles}>
                    <label>Room ID: </label>
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
                    <label>Password: </label>
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
                  >
                    LOGIN
                  </button>
                </div>
              }
            </Form>
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
