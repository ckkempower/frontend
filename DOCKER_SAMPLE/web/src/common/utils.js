import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password is too short - should be 8 chars minimum."),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  country: yup.object().required("Country is required."),
  county: yup.object().required("County is required."),
  state: yup.object().required("State is required."),
  city: yup.object().required("City is required."),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required."),
});

export const errorMessages = {
  firstName: "First name is required.",
  lastName: "Last name is required.",
  userName: "User name is required.",
};
