/// <reference types="vite/client" />

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
  customers: number;
}

interface LocationsData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  image: string;
}

interface StartDatesData {
  id: number;
  startDate: string;
}

interface TagsData {
  id: number;
  tag: string;
}
