export function getInitialTourValues(
  isEditMode: boolean,
  existingTour?: ToursData,
): ToursRequestData {
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
}
