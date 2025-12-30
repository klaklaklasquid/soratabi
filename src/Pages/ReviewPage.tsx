import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikError,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { useTourById } from "../Hooks/useTourById";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import RatingStars from "../Components/browseComponents/RatingsStars";
import TextWithToggle from "../Components/browseComponents/TextWithToggle";
import { useReviewByTourId } from "@/Hooks/useReviewByTourId";
import { useCreateReview } from "../Hooks/useCreateReview";

interface ReviewFormValues {
  rating: number;
  review: string;
}

const ReviewSchema = Yup.object().shape({
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

function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tourId = Number(id);

  const { data: tour, isLoading, error } = useTourById(tourId);
  const { stats } = useReviewByTourId(tourId);
  const { mutate: createReview } = useCreateReview();
  const [hoveredRating, setHoveredRating] = useState(0);

  const initialValues: ReviewFormValues = {
    rating: 0,
    review: "",
  };

  const handleSubmit = (
    values: ReviewFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<ReviewFormValues>,
  ) => {
    createReview(
      {
        tourId: tourId,
        tourName: tour?.name || "",
        rating: values.rating,
        review: values.review,
      },
      {
        onSuccess: () => {
          navigate(`/tour/${tour?.type}/${tourId}`);
        },
        onError: (err) => {
          console.error("Error submitting review:", err);
          setFieldError("review", "Failed to submit review. Please try again.");
        },
        onSettled: () => {
          setSubmitting(false);
        },
      },
    );
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load tour details" />;
  if (!tour) return <ErrorMessage message="Tour not found" />;

  return (
    <section className="mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      {/* Tour Preview */}
      <div className="relative mb-8 flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl bg-white/30 shadow-xl backdrop-blur-md md:flex-row">
        {/* Info Panel Left */}
        <div className="z-10 flex flex-col gap-2 px-6 py-8 md:w-1/2">
          <div className="mb-2 flex items-center justify-between">
            <RatingStars
              rating={stats ? stats.averageRating : tour.ratingsAverage}
            />
            <span className="bg-secondary-blue rounded-full px-4 py-2 text-white">
              {stats ? stats.totalReviews : tour.ratingsQuantity} reviews
            </span>
          </div>
          <h2 className="text-primary-blue text-3xl font-bold">{tour.name}</h2>
          <h4 className="text-lg text-gray-700">{tour.summary}</h4>
          <div className="my-2 flex gap-4">
            <span className="bg-primary-yellow/80 text-primary-blue rounded-full px-4 py-1 text-lg font-bold shadow">
              € {tour.price}
            </span>
            <span className="bg-primary-blue/80 rounded-full px-4 py-1 text-lg font-medium text-white shadow">
              {tour.duration}-Day
            </span>
          </div>
          <TextWithToggle text={tour.description} />
        </div>
        {/* Image Right */}
        <div
          className="flex min-h-[220px] w-full items-end justify-end md:min-h-8 md:w-1/2"
          style={{
            backgroundImage: `url(${tour.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 15%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-secondary-blue/90 absolute right-4 bottom-4 rounded-full px-5 py-2 text-xs font-bold text-white shadow-lg">
            {tour.tags.map((tag) => tag.tag).join(", ")}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-primary-blue/40 border-tertiary-blue/30 rounded-3xl border p-8 shadow-lg backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Share Your Experience
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              {/* Star Rating */}
              <div className="mb-8">
                <label className="mb-3 block text-lg font-semibold text-white">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentRating = hoveredRating || values.rating;
                    const isFullStar = star <= currentRating;
                    const isHalfStar = star - 0.5 === currentRating;

                    return (
                      <div key={star} className="relative">
                        {/* Left half - for half star */}
                        <button
                          type="button"
                          onClick={() => setFieldValue("rating", star - 0.5)}
                          onMouseEnter={() => setHoveredRating(star - 0.5)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="absolute top-0 left-0 z-10 h-full w-1/2"
                          style={{ cursor: "pointer" }}
                        />
                        {/* Right half - for full star */}
                        <button
                          type="button"
                          onClick={() => setFieldValue("rating", star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="absolute top-0 right-0 z-10 h-full w-1/2"
                          style={{ cursor: "pointer" }}
                        />
                        <FontAwesomeIcon
                          icon={
                            isFullStar
                              ? fullStar
                              : isHalfStar
                                ? halfStar
                                : outlineStar
                          }
                          className={`${
                            isFullStar || isHalfStar
                              ? "text-star"
                              : "text-gray-300"
                          } pointer-events-none transition-colors`}
                          size="2x"
                        />
                      </div>
                    );
                  })}
                </div>
                {values.rating > 0 && (
                  <p className="mt-2 text-sm text-gray-200">
                    {values.rating <= 1.5 && "Poor"}
                    {values.rating >= 2 && values.rating <= 2.5 && "Fair"}
                    {values.rating >= 3 && values.rating <= 3.5 && "Good"}
                    {values.rating >= 4 && values.rating <= 4.5 && "Very Good"}
                    {values.rating === 5 && "Excellent"}
                  </p>
                )}
                {errors.rating && touched.rating && (
                  <p className="mt-2 text-sm text-red-400">{errors.rating}</p>
                )}
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label
                  htmlFor="review"
                  className="mb-3 block text-lg font-semibold text-white"
                >
                  Your Review
                </label>
                <Field
                  as="textarea"
                  id="review"
                  name="review"
                  placeholder="Tell us about your experience..."
                  className="focus:border-secondary-blue focus:ring-secondary-blue/30 h-40 w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white transition-all placeholder:text-gray-300 focus:ring-2 focus:outline-none"
                  maxLength={1000}
                />
                <div className="mt-2 flex items-center justify-between">
                  <FormikError
                    name="review"
                    component="p"
                    className="text-sm text-red-400"
                  />
                  <p className="text-sm text-gray-300">
                    {values.review.length}/1000 characters
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary-blue hover:bg-secondary-blue/90 flex-1 rounded-xl px-6 py-3 font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default ReviewPage;
