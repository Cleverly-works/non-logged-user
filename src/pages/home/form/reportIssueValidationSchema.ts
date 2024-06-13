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
      id: yup.number().required("Issue type is a required field"),
      label: yup.string().required("Issue type is a required field"),
      imageLink: yup.string().required("Issue type is a required field"),
    })
    .nonNullable()
    .required("Issue type is a required field"),
  location: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.number().required(),
    })
    .nonNullable()
    .required("Location is required"),
  sublocation: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.number().required(),
    })
    .nonNullable()
    .required("Sublocation is required"),
  description: yup.string().required("Description is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  shouldSendNotifications: yup.boolean(),
});
