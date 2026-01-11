import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTour as CreateTourAPI, UpdateTour } from "../Api/apiTours";
import { GetAllLocations, CreateLocation } from "../Api/apiLocation";
import { GetAllStartDates, CreateStartDate } from "../Api/apiStartDates";
import { GetAllTags, CreateTag } from "../Api/apiTags";
import { useNavigate } from "react-router-dom";
import { retryLogic } from "@/Utils/queryUtils";

interface UseCreateTourCallbacks {
  onLocationCreated: () => void;
  onStartDateCreated: () => void;
  onTagCreated: () => void;
}

interface UseCreateTourOptions {
  tourId?: number;
  isEditMode?: boolean;
}

export function useCreateTour(
  callbacks: UseCreateTourCallbacks,
  options?: UseCreateTourOptions,
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tourId, isEditMode } = options || {};

  // Queries
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: GetAllLocations,
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  const { data: startDates = [] } = useQuery({
    queryKey: ["startDates"],
    queryFn: GetAllStartDates,
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: GetAllTags,
    retry: retryLogic,
    staleTime: 5 * 60 * 1000,
  });

  // Create/Update tour mutation
  const createTourMutation = useMutation({
    mutationFn: (data: ToursRequestData | TourUpdateRequestData) => {
      if (isEditMode && tourId) {
        return UpdateTour(tourId, data as TourUpdateRequestData);
      }
      return CreateTourAPI(data as ToursRequestData);
    },
    onSuccess: (newTour) => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      queryClient.invalidateQueries({ queryKey: ["countTours"] });
      
      if (isEditMode) {
        navigate(-1);
      } else {
        navigate(`/tour/${newTour.type}/${newTour.id}`, { replace: true });
      }
    },
  });

  // Create entity mutations
  const createLocationMutation = useMutation({
    mutationFn: CreateLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      callbacks.onLocationCreated();
    },
  });

  const createStartDateMutation = useMutation({
    mutationFn: CreateStartDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startDates"] });
      callbacks.onStartDateCreated();
    },
  });

  const createTagMutation = useMutation({
    mutationFn: CreateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      callbacks.onTagCreated();
    },
  });

  return {
    locations,
    startDates,
    tags,
    createTourMutation,
    createLocationMutation,
    createStartDateMutation,
    createTagMutation,
  };
}
