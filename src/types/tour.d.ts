interface TourAndCruiseDateContract {
  tours: ToursData[];
  cruises: ToursData[];
}

interface ToursData {
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
  startDates: StartDatesData[];
  tags: TagsData[];
}

interface ToursRequestData {
  name: string;
  duration: number;
  price: number;
  summary: string;
  description: string;
  coverImage: File;
  type: string;
  maxCustomers: number;
  locationIds: number[];
  startDateIds: number[];
  tagIds: number[];
}

interface TourUpdateRequestData {
  name: string;
  duration: number;
  price: number;
  summary: string;
  description: string;
  coverImage?: File;
  type: string;
  maxCustomers: number;
  locationIds: number[];
  startDateIds: number[];
  tagIds: number[];
}

interface LocationsData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  image: string;
}

interface LocationRequestData {
  name: string;
  description: string;
  image: File;
}

interface StartDatesData {
  id: number;
  startDate: string;
  currentCustomers: number;
}

interface StartDateRequestData {
  startDate: string;
}

interface TagsData {
  id: number;
  tag: string;
}

interface TagsRequestData {
  tag: string;
}
