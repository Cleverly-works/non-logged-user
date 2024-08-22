import * as yup from "yup";

export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const issueReportValidationSchema = yup.object().shape({
  attachments: yup.array(),
  issueType: yup
    .object()
    .shape({
      id: yup.number().required("Please choose a category of the issue"),
      name: yup.string().required("Please choose a category of the issue"),
      imageLink: yup.string().required("Please choose a category of the issue"),
    })
    .nonNullable()
    .required("Please choose a category of the issue"),
  location: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.number().required(),
    })
    .nonNullable()
    .required("Please choose your location"),
  sublocation: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.number(),
    })
    .nonNullable()
    .required("Sublocation is required"),
  description: yup.string(),
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  phone: yup.string().required("Please enter your phone number"),
  shouldSendNotifications: yup.boolean(),
});
