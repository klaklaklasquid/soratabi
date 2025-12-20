import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserFriends,
  faCheckCircle,
  faExclamationTriangle,
  faTicketAlt,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";

interface SelectedDateDisplayProps {
  date: StartDatesData;
  maxCustomers: number;
  tourPrice: number;
  onSubmit: (
    values: { tickets: number },
    actions: { setSubmitting: (isSubmitting: boolean) => void },
  ) => void;
}

const PurchaseSchema = Yup.object().shape({
  tickets: Yup.number()
    .min(1, "Must purchase at least 1 ticket")
    .required("Number of tickets is required"),
});

function SelectedDateDisplay({
  date,
  maxCustomers,
  tourPrice,
  onSubmit,
}: SelectedDateDisplayProps) {
  const remainingSlots = maxCustomers - date.currentCustomers;
  const slotPercent = Math.max(0, Math.min(1, remainingSlots / maxCustomers));

  let slotBarColor = "bg-primary-blue/80";
  let slotTextColor = "text-offwhite";
  let slotFillColor = "bg-secondary-blue/80";
  let cardBg = "bg-primary-blue/10";
  let statusIcon = faCheckCircle;
  let statusIconColor = "text-tertiary-blue";
  let statusMessage = "Available";

  if (slotPercent < 0.35) {
    slotBarColor = "bg-tertiary-red/20 animate-pulse";
    slotTextColor = "text-tertiary-red";
    slotFillColor = "bg-tertiary-red/80";
    cardBg = "bg-tertiary-red/10";
    statusIcon = faExclamationTriangle;
    statusIconColor = "text-tertiary-red";
    statusMessage = "Limited Availability";
  } else if (slotPercent < 0.65) {
    slotBarColor = "bg-primary-yellow/20";
    slotTextColor = "text-offwhite";
    slotFillColor = "bg-primary-yellow/80";
    cardBg = "bg-primary-yellow/10";
    statusIconColor = "text-offwhite";
    statusMessage = "Filling Fast";
  }

  return (
    <Card
      className={`flex w-full flex-col gap-0 rounded-3xl border-none ${cardBg} p-0 shadow-2xl backdrop-blur-xl`}
    >
      <CardHeader className="flex flex-col items-center gap-2 px-8 pt-8">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="text-offwhite mb-2 text-3xl"
        />
        <CardTitle className="text-offwhite text-3xl font-extrabold tracking-wide drop-shadow-lg">
          {date.startDate}
        </CardTitle>
        <CardDescription className="text-base text-gray-500">
          Your Selected Tour Date
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 px-8 py-6">
        <div className="flex w-full flex-col gap-2">
          <div
            className={`relative h-6 w-full rounded-full ${slotBarColor} shadow-inner`}
          >
            <div
              className={`absolute top-0 left-0 h-6 rounded-full ${slotFillColor} transition-all duration-500`}
              style={{ width: `${slotPercent * 100}%` }}
            />
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold ${slotTextColor}`}
            >
              {remainingSlots} slots left
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faUserFriends}
            className="text-offwhite text-xl"
          />
          <span className="text-base text-white">Max: {maxCustomers}</span>
          <FontAwesomeIcon
            icon={statusIcon}
            className={`text-xl ${statusIconColor}`}
            title={statusMessage}
          />
        </div>

        {/* Divider */}
        <div className="bg-primary-blue/20 my-4 h-px w-full" />

        {/* Purchase Form */}
        <Formik
          initialValues={{
            tickets: 1,
          }}
          validationSchema={PurchaseSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex w-full flex-col gap-6">
              {/* Number of Tickets Selector */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="tickets"
                  className="text-offwhite flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  <FontAwesomeIcon icon={faTicketAlt} />
                  Select Number of Tickets
                </label>

                <div className="flex items-center justify-center gap-3 sm:gap-6">
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("tickets", Math.max(1, values.tickets - 1))
                    }
                    disabled={values.tickets <= 1}
                    className="from-primary-blue to-secondary-blue ring-primary-blue/30 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-linear-to-br text-xl shadow-xl ring-2 transition-all duration-200 hover:scale-110 hover:shadow-2xl hover:ring-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:ring-2 sm:h-16 sm:w-16 sm:text-2xl"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>

                  <div className="bg-primary-blue/10 flex flex-col items-center rounded-2xl px-8 py-4 sm:px-12 sm:py-6">
                    <span className="text-offwhite text-4xl font-bold sm:text-5xl">
                      {values.tickets}
                    </span>
                    <span className="mt-1 text-xs text-gray-600 sm:text-sm">
                      {values.tickets === 1 ? "ticket" : "tickets"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "tickets",
                        Math.min(remainingSlots, values.tickets + 1),
                      )
                    }
                    disabled={values.tickets >= remainingSlots}
                    className="from-primary-blue to-secondary-blue ring-primary-blue/30 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-linear-to-br text-xl shadow-xl ring-2 transition-all duration-200 hover:scale-110 hover:shadow-2xl hover:ring-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:ring-2 sm:h-16 sm:w-16 sm:text-2xl"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <FormikError
                  name="tickets"
                  component="div"
                  className="text-tertiary-red text-center text-sm"
                />
              </div>

              {/* Total Price Display */}
              <div className="bg-secondary-blue/30 flex flex-col gap-3 rounded-3xl p-4 shadow-2xl sm:p-6">
                <div className="border-tertiary-blue/30 flex items-center justify-between border-b pb-2 sm:pb-3">
                  <span className="text-offwhite text-sm font-medium sm:text-base">
                    Price per ticket
                  </span>
                  <span className="text-offwhite text-base font-bold sm:text-lg">
                    € {tourPrice}
                  </span>
                </div>
                <div className="border-tertiary-blue/30 flex items-center justify-between border-b pb-2 sm:pb-3">
                  <span className="text-offwhite text-sm font-medium sm:text-base">
                    Quantity
                  </span>
                  <span className="text-offwhite text-base font-bold sm:text-lg">
                    {values.tickets}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-offwhite text-lg font-bold tracking-wide uppercase sm:text-xl">
                    Total
                  </span>
                  <span className="text-offwhite text-2xl font-black sm:text-4xl">
                    € {(values.tickets * tourPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || remainingSlots <= 0}
                className="bg-primary-blue text-offwhite rounded-full py-3 text-base font-bold shadow-lg transition-all duration-200 hover:scale-101 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-4 sm:text-lg"
              >
                {isSubmitting
                  ? "Processing..."
                  : remainingSlots <= 0
                    ? "Sold Out"
                    : `Complete Purchase`}
              </button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default SelectedDateDisplay;
