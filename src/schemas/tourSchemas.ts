import * as Yup from "yup";

export const createTourValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  duration: Yup.number().required("Duration is required").positive().integer(),
  price: Yup.number().required("Price is required").positive(),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
  maxCustomers: Yup.number()
    .required("Max customers is required")
    .positive()
    .integer(),
  coverImage: Yup.mixed().required("Cover image is required"),
  locationIds: Yup.array()
    .of(Yup.number())
    .min(1, "At least one location is required"),
  startDateIds: Yup.array()
    .of(Yup.number())
    .min(1, "At least one start date is required"),
  tagIds: Yup.array().of(Yup.number()).min(1, "At least one tag is required"),
});
