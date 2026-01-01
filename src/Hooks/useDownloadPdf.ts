import { useMutation } from "@tanstack/react-query";
import { CreatePdf } from "@/Api/apiPdf";

export function useDownloadPdf() {
  return useMutation({
    mutationFn: ({
      tourId,
      startDateId,
    }: {
      tourId: number;
      startDateId: number;
    }) => CreatePdf(tourId, startDateId),
    onSuccess: (blob, variables) => {
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `tour-${variables.tourId}-booking-confirmation.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
}
