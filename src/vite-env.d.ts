/// <reference types="vite/client" />

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
  currentCustomers: number;
}

interface TagsData {
  id: number;
  tag: string;
}

interface UserInterface {
  id: number;
  role: "admin" | "user";
  firstname: string;
  lastname: string;
  userPhoto: string;
}

interface ReviewResponse {
  id: string;
  review: string;
  rating: number;
  createdAt: string;

  // Tour info
  tourId: number;
  tourName: string;

  // User info
  userId: number;
  userName: string;
  userPhoto: string;
}

type ReviewRequest = Omit<ReviewResponse, "id">;
