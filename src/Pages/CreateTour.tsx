import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlurSpot from "@/UI/BlurSpot";
import CreateTagPopup from "@/Components/createTourComponents/CreateTagPopup";
import CreateLocationPopup from "@/Components/createTourComponents/CreateLocationPopup";
import CreateStartDatePopup from "@/Components/createTourComponents/CreateStartDatePopup";
import TagsSelector from "@/Components/createTourComponents/TagsSelector";
import LocationsSelector from "@/Components/createTourComponents/LocationsSelector";
import StartDatesSelector from "@/Components/createTourComponents/StartDatesSelector";
import CoverImageUpload from "@/Components/createTourComponents/CoverImageUpload";
import TourFormFields from "@/Components/createTourComponents/TourFormFields";
import { useCreateTour } from "@/Hooks/useCreateTour";
import { createTourValidationSchema } from "@/schemas/tourSchemas";
import { GetTourById } from "@/Api/apiGetTourById";
import Loading from "@/UI/Loading";
import ErrorMessage from "@/UI/ErrorMessage";
import NotFound from "@/UI/NotFound";
import { retryLogic } from "@/Utils/queryUtils";
import { getInitialTourValues } from "@/Utils/tourFormUtils";
import { AxiosError } from "axios";

function CreateTour() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // Fetch existing tour data if editing
  const {
    data: existingTour,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tour", Number(id)],
    queryFn: () => GetTourById(Number(id)),
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
    enabled: isEditMode,
  });

  const [locationSearch, setLocationSearch] = useState("");
  const [startDateSearch, setStartDateSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  // Popup states
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showStartDatePopup, setShowStartDatePopup] = useState(false);
  const [showTagPopup, setShowTagPopup] = useState(false);

  // New entity form states
  const [newLocation, setNewLocation] = useState<LocationRequestData>({
    name: "",
    description: "",
    image: null!,
  });
  const [newStartDate, setNewStartDate] = useState<StartDateRequestData>({
    startDate: "",
  });
  const [newTag, setNewTag] = useState<TagsRequestData>({ tag: "" });

  const {
    locations,
    startDates,
    tags,
    createTourMutation,
    createLocationMutation,
    createStartDateMutation,
    createTagMutation,
  } = useCreateTour(
    {
      onLocationCreated: () => {
        setShowLocationPopup(false);
        setNewLocation({
          name: "",
          description: "",
          image: null!,
        });
      },
      onStartDateCreated: () => {
        setShowStartDatePopup(false);
        setNewStartDate({ startDate: "" });
      },
      onTagCreated: () => {
        setShowTagPopup(false);
        setNewTag({ tag: "" });
      },
    },
    {
      tourId: id ? Number(id) : undefined,
      isEditMode,
    },
  );

  useEffect(() => {
    if (isEditMode && existingTour) {
      setImagePreview(existingTour.coverImage);
    }
  }, [isEditMode, existingTour]);

  if (isEditMode && isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isEditMode && isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <ErrorMessage message={error?.message} />
      </div>
    );
  }

  return (
    <section className="relative mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        {isEditMode ? "Edit Tour" : "Create New Tour"}
      </h1>

      <Formik
        enableReinitialize
        initialValues={getInitialTourValues(isEditMode, existingTour)}
        validationSchema={createTourValidationSchema(isEditMode)}
        onSubmit={(values) => {
          createTourMutation.mutate(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-5">
            {/* Hero Section with Image */}
            <div className="relative flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md md:flex-row">
              {/* Info Panel Left */}
              <TourFormFields values={values} setFieldValue={setFieldValue} />

              {/* Image Right */}
              <CoverImageUpload
                imagePreview={imagePreview}
                setFieldValue={setFieldValue}
                setImagePreview={setImagePreview}
                tags={tags}
                selectedTagIds={values.tagIds}
              />
            </div>

            {/* Tags Autocomplete */}
            <TagsSelector
              values={values}
              tags={tags}
              tagSearch={tagSearch}
              setTagSearch={setTagSearch}
              setFieldValue={setFieldValue}
              onCreateNew={() => setShowTagPopup(true)}
            />

            {/* Locations Autocomplete */}
            <LocationsSelector
              values={values}
              locations={locations}
              locationSearch={locationSearch}
              setLocationSearch={setLocationSearch}
              setFieldValue={setFieldValue}
              onCreateNew={() => setShowLocationPopup(true)}
            />

            {/* Start Dates Autocomplete */}
            <StartDatesSelector
              values={values}
              startDates={startDates}
              startDateSearch={startDateSearch}
              setStartDateSearch={setStartDateSearch}
              setFieldValue={setFieldValue}
              onCreateNew={() => setShowStartDatePopup(true)}
            />

            {/* Submit Buttons */}
            <div className="flex gap-4 self-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createTourMutation.isPending}
                className="bg-primary-yellow/80 text-primary-blue rounded-full border border-white/20 px-8 py-3 text-lg font-bold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {createTourMutation.isPending ? "Creating..." : "Create Tour"}
              </button>
            </div>

            {createTourMutation.isError && (
              <div className="rounded-lg border border-red-400/50 bg-red-500/20 px-4 py-3 text-center text-red-300 backdrop-blur-sm">
                {createTourMutation.error?.message ||
                  "Error creating tour. Please try again."}
              </div>
            )}
          </Form>
        )}
      </Formik>

      {/* Popups */}
      <CreateTagPopup
        isOpen={showTagPopup}
        onClose={() => setShowTagPopup(false)}
        onCreate={() => createTagMutation.mutate(newTag)}
        tagValue={newTag.tag}
        onTagChange={(value) => setNewTag({ tag: value })}
        isCreating={createTagMutation.isPending}
      />

      <CreateLocationPopup
        isOpen={showLocationPopup}
        onClose={() => setShowLocationPopup(false)}
        onCreate={() => createLocationMutation.mutate(newLocation)}
        location={newLocation}
        onLocationChange={(field, value) =>
          setNewLocation({ ...newLocation, [field]: value })
        }
        isCreating={createLocationMutation.isPending}
      />

      <CreateStartDatePopup
        isOpen={showStartDatePopup}
        onClose={() => setShowStartDatePopup(false)}
        onCreate={() => createStartDateMutation.mutate(newStartDate)}
        startDate={newStartDate.startDate}
        onStartDateChange={(value) => setNewStartDate({ startDate: value })}
        isCreating={createStartDateMutation.isPending}
      />

      {/* Decorative blurred spots */}
      <BlurSpot
        color="bg-tertiary-blue/20"
        className="top-1/4 left-0 h-48 w-48 sm:h-72 sm:w-72"
        blur="blur-[80px] sm:blur-[100px]"
      />
      <BlurSpot
        color="bg-secondary-blue/20"
        className="right-0 bottom-1/4 h-64 w-64 sm:right-1/4 sm:h-96 sm:w-96"
        blur="blur-[100px] sm:blur-[120px]"
      />
    </section>
  );
}

export default CreateTour;
