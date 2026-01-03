import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTour as CreateTourAPI } from "../Api/apiTours";
import { GetAllLocations, CreateLocation } from "../Api/apiLocation";
import { GetAllStartDates, CreateStartDate } from "../Api/apiStartDates";
import { GetAllTags, CreateTag } from "../Api/apiTags";
import { useNavigate } from "react-router-dom";

interface UseCreateTourCallbacks {
  onLocationCreated: () => void;
  onStartDateCreated: () => void;
  onTagCreated: () => void;
}

export function useCreateTour(callbacks: UseCreateTourCallbacks) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Queries
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: GetAllLocations,
  });

  const { data: startDates = [] } = useQuery({
    queryKey: ["startDates"],
    queryFn: GetAllStartDates,
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: GetAllTags,
  });

  // Create tour mutation
  const createTourMutation = useMutation({
    mutationFn: CreateTourAPI,
    onSuccess: (newTour) => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      navigate(`/tour/${newTour.type}/${newTour.id}`);
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
