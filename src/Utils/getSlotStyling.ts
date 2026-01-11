import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export function getSlotStyling(
  remainingSlots: number,
  maxCustomers: number,
  variant: "card" | "display" = "card",
): SlotStyling {
  //! FORCE YELLOW STATE FOR TESTING - COMMENT OUT WHEN DONE
  //   if (true) {
  //     return {
  //       slotBarColor: "bg-primary-yellow/20",
  //       slotTextColor:
  //         variant === "card" ? "text-primary-yellow" : "text-offwhite",
  //       slotFillColor: "bg-primary-yellow/80",
  //       cardBorder: variant === "card" ? "border-primary-yellow/40" : undefined,
  //       cardBg: variant === "display" ? "bg-primary-yellow/10" : undefined,
  //       statusIcon: faCheckCircle,
  //       statusIconColor: "text-offwhite",
  //       statusMessage: "Filling Fast",
  //     };
  //   }

  //! FORCE RED STATE FOR TESTING - COMMENT OUT WHEN DONE
  //   if (true) {
  //     return {
  //       slotBarColor: "bg-tertiary-red/20 animate-pulse",
  //       slotTextColor: "text-white",
  //       slotFillColor: "bg-tertiary-red/80",
  //       cardBorder: variant === "card" ? "border-tertiary-red/40" : undefined,
  //       cardBg: variant === "display" ? "bg-tertiary-red/10" : undefined,
  //       statusIcon: faExclamationTriangle,
  //       statusIconColor: "text-tertiary-red",
  //       statusMessage: "Limited Availability",
  //     };
  //   }

  const slotPercent = Math.max(0, Math.min(1, remainingSlots / maxCustomers));

  // Default/Good availability (> 65%)
  if (slotPercent >= 0.65) {
    return {
      slotBarColor: variant === "card" ? "bg-white/20" : "bg-primary-blue/80",
      slotTextColor: variant === "card" ? "text-white" : "text-offwhite",
      slotFillColor: "bg-secondary-blue/80",
      cardBorder: variant === "card" ? "border-white/10" : undefined,
      cardBg: variant === "display" ? "bg-primary-blue/10" : undefined,
      statusIcon: faCheckCircle,
      statusIconColor: "text-tertiary-blue",
      statusMessage: "Available",
    };
  }

  // Medium availability (35% - 65%)
  if (slotPercent >= 0.35) {
    return {
      slotBarColor: "bg-primary-yellow/20",
      slotTextColor:
        variant === "card" ? "text-primary-yellow" : "text-offwhite",
      slotFillColor: "bg-primary-yellow/80",
      cardBorder: variant === "card" ? "border-primary-yellow/40" : undefined,
      cardBg: variant === "display" ? "bg-primary-yellow/10" : undefined,
      statusIcon: faCheckCircle,
      statusIconColor: variant === "card" ? "text-offwhite" : "text-offwhite",
      statusMessage: "Filling Fast",
    };
  }

  // Low availability (< 35%)
  return {
    slotBarColor: "bg-tertiary-red/20 animate-pulse",
    slotTextColor: "text-white",
    slotFillColor: "bg-tertiary-red/80",
    cardBorder: variant === "card" ? "border-tertiary-red/40" : undefined,
    cardBg: variant === "display" ? "bg-tertiary-red/10" : undefined,
    statusIcon: faExclamationTriangle,
    statusIconColor: "text-tertiary-red",
    statusMessage: "Limited Availability",
  };
}

interface SlotStyling {
  slotBarColor: string;
  slotTextColor: string;
  slotFillColor: string;
  cardBorder?: string;
  cardBg?: string;
  statusIcon: typeof faCheckCircle | typeof faExclamationTriangle;
  statusIconColor: string;
  statusMessage: string;
}
