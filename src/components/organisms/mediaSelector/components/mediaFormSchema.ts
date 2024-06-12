import * as yup from "yup";

export const mediaFormSchema = yup.object().shape({
  caption: yup.string(),
});
