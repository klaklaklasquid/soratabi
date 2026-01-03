interface JourneyResponse {
  id: number;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  duration: number;
  price: number;
  summary: string;
  description: string;
  coverImage: string;
  type: string;
  maxCustomers: number;
  locations: LocationsData[];
  tags: TagsData[];
  bookedStartDate: StartDatesData;
}
