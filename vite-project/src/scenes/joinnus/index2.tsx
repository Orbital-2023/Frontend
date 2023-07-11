// // Integrated with Register API
// // 11th July 2023

// import { useForm } from "react-hook-form";
// import { Link } from 'react-router-dom';

// import { SelectedPage } from "@/shared/types";
// import { motion } from "framer-motion";
// import HText from "@/shared/HText";

// import { Component } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup"

// import authService from '@/services/auth.service';

// type Props = {
//   setSelectedPage: (value: SelectedPage) => void;
// };


// const JoinUs = ({ setSelectedPage }: Props) => {
//   const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
//   px-5 py-3 placeholder-white`;

//   const {
//     register,
//     trigger,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (e: any) => {
//     const isValid = await trigger();
//     if (!isValid) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <section id="joinus" className="mx-auto w-5/6 pt-24 pb-32">
//       <motion.div
//         onViewportEnter={() => setSelectedPage(SelectedPage.JoinUs)}
//       >
//         {/* HEADER */}
//         <motion.div
//           className="md:w-3/5"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.5 }}
//           variants={{
//             hidden: { opacity: 0, x: -50 },
//             visible: { opacity: 1, x: 0 },
//           }}
//         >
//           <HText>
//             <span className="mt-10 text-primary-500">JOIN NOW</span> TO GET PLANNING
//           </HText>
//           <p className="my-5">
//             Generate your unique Room ID, key in your room password and provide us with your Gmail Account to get started!
//           </p>
//         </motion.div>

//         {/* FORM AND IMAGE */}
//         <div className="mt-10 justify-between gap-8 md:flex">
//           <motion.div
//             className="mt-10 basis-3/5 md:mt-0"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.5 }}
//             variants={{
//               hidden: { opacity: 0, y: 50 },
//               visible: { opacity: 1, y: 0 },
//             }}
//           >
//             <form
//               target="_blank"
//               onSubmit={onSubmit}
//               action="https://formsubmit.co/e8a5bdfa807605332f809e5656e27c6e"
//               method="POST"
//             >
//               <input
//                 className={inputStyles}
//                 type="text"
//                 placeholder="ROOM ID"
//                 {...register("roomid", {
//                   required: true,
//                   maxLength: 100,
//                 })}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-primary-500">
//                   {errors.name.type === "required" && "This field is required."}
//                   {errors.name.type === "maxLength" &&
//                     "Max length is 100 char."}
//                 </p>
//               )}

//               <input
//                 className={inputStyles}
//                 type="text"
//                 placeholder="ROOM PASSWORD"
//                 {...register("roompassword", {
//                   required: true,
//                   maxLength: 100,
//                 })}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-primary-500">
//                   {errors.name.type === "required" && "This field is required."}
//                   {errors.name.type === "maxLength" &&
//                     "Max length is 100 char."}
//                 </p>
//               )}

//               <input
//                 className={inputStyles}
//                 type="text"
//                 placeholder="GMAIL"
//                 {...register("email", {
//                   required: true,
//                   pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 })}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-primary-500">
//                   {errors.email.type === "required" &&
//                     "This field is required."}
//                   {errors.email.type === "pattern" && "Invalid email address."}
//                 </p>
//               )}
//               <Link to="/dashboard">
//                 <button
//                   type="submit"
//                   className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
//                 >
//                   REGISTER
//                 </button>
//               </Link>
//             </form>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default JoinUs;
