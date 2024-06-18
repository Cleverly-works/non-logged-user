import * as yup from "yup";

export const issueReportValidationSchema = yup.object().shape({
  attachments: yup.array(
    yup.object().shape({
      caption: yup.string(),
      type: yup.string(),
      media: yup.mixed(),
    }),
  ),
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
  description: yup
    .string()
    .required(
      "Please provide at least one media or a description of the issue",
    ),
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter your name"),
  phone: yup.string().required("Please enter your phone number"),
  shouldSendNotifications: yup.boolean(),
});
