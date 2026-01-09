import * as Yup from "yup";

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(0.5, "Please select a rating")
    .max(5, "Rating must be between 0.5 and 5")
    .test("is-half-or-full", "Rating must be in increments of 0.5", (value) => {
      if (!value) return false;
      return value % 0.5 === 0;
    })
    .required("Rating is required"),
  review: Yup.string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must not exceed 1000 characters")
    .required("Review is required"),
});
