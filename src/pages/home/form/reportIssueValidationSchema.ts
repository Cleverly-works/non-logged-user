import * as yup from "yup";

export const issueReportValidationSchema = yup.object().shape({
  attachments: yup.array(
    yup.object().shape({
      caption: yup.string(),
      type: yup.string(),
      media: yup.object(),
    }),
  ),
  issueType: yup
    .object()
    .shape({
      id: yup.number(),
      label: yup.string(),
      imageLink: yup.string(),
    })
    .nonNullable()
    .required("Issue type is a required field"),
  location: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.number(),
    })
    .nonNullable()
    .required("Location is required"),
  description: yup.string().required("Description is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
});
