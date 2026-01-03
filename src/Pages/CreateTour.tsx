import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlurSpot from "@/UI/BlurSpot";
import CreateTagPopup from "@/Components/createTourComponents/CreateTagPopup";
import CreateLocationPopup from "@/Components/createTourComponents/CreateLocationPopup";
import CreateStartDatePopup from "@/Components/createTourComponents/CreateStartDatePopup";
import { useCreateTour } from "@/Hooks/useCreateTour";
import { createTourValidationSchema } from "@/schemas/tourSchemas";
import { GetTourById } from "@/Api/apiGetTourById";
import Loading from "@/UI/Loading";

function CreateTour() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  // Fetch existing tour data if editing
  const { data: existingTour, isLoading } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => GetTourById(Number(id)),
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

  const getInitialValues = (): ToursRequestData => {
    if (isEditMode && existingTour) {
      return {
        name: existingTour.name,
        duration: existingTour.duration,
        price: existingTour.price,
        summary: existingTour.summary,
        description: existingTour.description,
        coverImage: undefined as unknown as File,
        type: existingTour.type,
        maxCustomers: existingTour.maxCustomers,
        locationIds: existingTour.locations.map((loc) => loc.id),
        startDateIds: existingTour.startDates.map((date) => date.id),
        tagIds: existingTour.tags.map((tag) => tag.id),
      };
    }
    return {
      name: "",
      duration: "" as unknown as number,
      price: "" as unknown as number,
      summary: "",
      description: "",
      coverImage: undefined as unknown as File,
      type: "tour",
      maxCustomers: "" as unknown as number,
      locationIds: [],
      startDateIds: [],
      tagIds: [],
    };
  };

  useEffect(() => {
    if (isEditMode && existingTour) {
      setImagePreview(existingTour.coverImage);
    }
  }, [isEditMode, existingTour]);

  if (isEditMode && isLoading) {
    return <Loading />;
  }

  return (
    <section className="relative mx-5 mt-10 mb-10 flex flex-col gap-5 md:mx-20 lg:mx-40 xl:mx-80">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        {isEditMode ? "Edit Tour" : "Create New Tour"}
      </h1>

      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={createTourValidationSchema}
        onSubmit={(values) => {
          createTourMutation.mutate(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-5">
            {/* Hero Section with Image */}
            <div className="relative flex min-h-80 flex-col gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md md:flex-row">
              {/* Info Panel Left */}
              <div className="z-10 flex flex-col gap-3 px-6 py-8 md:w-1/2">
                {/* Name */}
                <div>
                  <Field
                    name="name"
                    type="text"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-3xl font-bold text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="Tour Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                {/* Summary */}
                <div>
                  <Field
                    name="summary"
                    as="textarea"
                    rows={2}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-lg font-medium text-gray-200 placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="Brief summary..."
                  />
                  <ErrorMessage
                    name="summary"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                {/* Price and Duration */}
                <div className="my-2 flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 shadow-lg backdrop-blur-sm">
                      <span className="text-lg font-semibold text-white">
                        €
                      </span>
                      <Field
                        name="price"
                        type="number"
                        step="0.01"
                        className="w-full [appearance:textfield] bg-transparent text-lg font-semibold text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="499.99"
                      />
                    </div>
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 shadow-lg backdrop-blur-sm">
                      <Field
                        name="duration"
                        type="number"
                        className="w-full [appearance:textfield] bg-transparent text-lg font-semibold text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="5"
                      />
                      <span className="text-lg font-semibold text-white">
                        Days
                      </span>
                    </div>
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Field
                    name="description"
                    as="textarea"
                    rows={6}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-gray-300 placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                    placeholder="Full tour description..."
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                {/* Type and Max Customers */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFieldValue("type", "tour")}
                        className={`flex-1 rounded-lg border px-4 py-2 font-semibold transition-all ${
                          values.type === "tour"
                            ? "border-primary-yellow bg-primary-yellow/20 text-primary-yellow"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        } backdrop-blur-sm`}
                      >
                        Tour
                      </button>
                      <button
                        type="button"
                        onClick={() => setFieldValue("type", "cruise")}
                        className={`flex-1 rounded-lg border px-4 py-2 font-semibold transition-all ${
                          values.type === "cruise"
                            ? "border-primary-yellow bg-primary-yellow/20 text-primary-yellow"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        } backdrop-blur-sm`}
                      >
                        Cruise
                      </button>
                    </div>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Max Customers
                    </label>
                    <Field
                      name="maxCustomers"
                      type="number"
                      className="w-full [appearance:textfield] rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="20"
                    />
                    <ErrorMessage
                      name="maxCustomers"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                </div>
              </div>

              {/* Image Right */}
              <div
                className="relative flex min-h-[220px] w-full items-end justify-end md:min-h-8 md:w-1/2"
                style={{
                  backgroundImage: imagePreview
                    ? `url(${imagePreview})`
                    : "none",
                  backgroundColor: imagePreview ? "transparent" : "#ffffff20",
                  backgroundSize: "cover",
                  backgroundPosition: "center 15%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {!imagePreview && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">Upload Cover Image</span>
                  </div>
                )}
                <input
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("coverImage", file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <ErrorMessage
                  name="coverImage"
                  component="div"
                  className="absolute top-2 left-2 text-sm text-red-400"
                />

                {/* Tags Display */}
                <div className="absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  {values.tagIds.length > 0
                    ? values.tagIds
                        .map((id) => tags.find((t) => t.id === id)?.tag)
                        .join(", ")
                    : "No tags selected"}
                </div>
              </div>
            </div>

            {/* Tags Autocomplete */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-lg font-semibold text-white">
                  Tags
                </label>
                <button
                  type="button"
                  onClick={() => setShowTagPopup(true)}
                  className="rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                >
                  + Create New
                </button>
              </div>
              <input
                type="text"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Search tags..."
                className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
              />
              {tagSearch && (
                <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
                  {tags
                    .filter((tag) =>
                      tag.tag.toLowerCase().includes(tagSearch.toLowerCase()),
                    )
                    .map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => {
                          if (!values.tagIds.includes(tag.id)) {
                            setFieldValue("tagIds", [...values.tagIds, tag.id]);
                          }
                          setTagSearch("");
                        }}
                        className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
                      >
                        {tag.tag}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {values.tagIds.map((id) => {
                  const tag = tags.find((t) => t.id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                    >
                      {tag?.tag}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "tagIds",
                            values.tagIds.filter((tid) => tid !== id),
                          )
                        }
                        className="text-lg text-white hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              <ErrorMessage
                name="tagIds"
                component="div"
                className="mt-2 text-sm text-red-400"
              />
            </div>

            {/* Locations Autocomplete */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-lg font-semibold text-white">
                  Locations
                </label>
                <button
                  type="button"
                  onClick={() => setShowLocationPopup(true)}
                  className="rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                >
                  + Create New
                </button>
              </div>
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search locations..."
                className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
              />
              {locationSearch && (
                <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
                  {locations
                    .filter((loc) =>
                      loc.name
                        .toLowerCase()
                        .includes(locationSearch.toLowerCase()),
                    )
                    .map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => {
                          if (!values.locationIds.includes(loc.id)) {
                            setFieldValue("locationIds", [
                              ...values.locationIds,
                              loc.id,
                            ]);
                          }
                          setLocationSearch("");
                        }}
                        className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
                      >
                        {loc.name}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {values.locationIds.map((id) => {
                  const loc = locations.find((l) => l.id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                    >
                      {loc?.name}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "locationIds",
                            values.locationIds.filter((lid) => lid !== id),
                          )
                        }
                        className="text-lg text-white hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              <ErrorMessage
                name="locationIds"
                component="div"
                className="mt-2 text-sm text-red-400"
              />
            </div>

            {/* Start Dates Autocomplete */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-lg font-semibold text-white">
                  Start Dates
                </label>
                <button
                  type="button"
                  onClick={() => setShowStartDatePopup(true)}
                  className="rounded-lg bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/30"
                >
                  + Create New
                </button>
              </div>
              <input
                type="text"
                value={startDateSearch}
                onChange={(e) => setStartDateSearch(e.target.value)}
                placeholder="Search start dates..."
                className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
              />
              {startDateSearch && (
                <div className="mb-3 max-h-40 overflow-y-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
                  {startDates
                    .filter((date) =>
                      date.startDate
                        .toLowerCase()
                        .includes(startDateSearch.toLowerCase()),
                    )
                    .map((date) => (
                      <div
                        key={date.id}
                        onClick={() => {
                          if (!values.startDateIds.includes(date.id)) {
                            setFieldValue("startDateIds", [
                              ...values.startDateIds,
                              date.id,
                            ]);
                          }
                          setStartDateSearch("");
                        }}
                        className="cursor-pointer px-4 py-2 text-white hover:bg-white/10"
                      >
                        {date.startDate}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {values.startDateIds.map((id) => {
                  const date = startDates.find((d) => d.id === id);
                  return (
                    <span
                      key={id}
                      className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                    >
                      {date?.startDate}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "startDateIds",
                            values.startDateIds.filter((did) => did !== id),
                          )
                        }
                        className="text-lg text-white hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              <ErrorMessage
                name="startDateIds"
                component="div"
                className="mt-2 text-sm text-red-400"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 self-center">
              <button
                type="button"
                onClick={() => navigate("/browse-destination")}
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
