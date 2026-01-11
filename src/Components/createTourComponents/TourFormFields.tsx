import { Field, ErrorMessage as FormikErrorMessage } from "formik";

interface TourFormFieldsProps {
  values: ToursRequestData;
  setFieldValue: (field: string, value: string) => void;
}

function TourFormFields({ values, setFieldValue }: TourFormFieldsProps) {
  return (
    <div className="z-10 flex flex-col gap-3 px-6 py-8 md:w-1/2">
      {/* Name */}
      <div>
        <Field
          name="name"
          type="text"
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-3xl font-bold text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
          placeholder="Tour Name"
        />
        <FormikErrorMessage
          name="name"
          component="div"
          className="mt-1 text-sm text-red-400"
        />
      </div>

      {/* Summary */}
      <div>
        <Field
          name="summary"
          as="textarea"
          rows={2}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-lg font-medium text-gray-200 placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
          placeholder="Brief summary..."
        />
        <FormikErrorMessage
          name="summary"
          component="div"
          className="mt-1 text-sm text-red-400"
        />
      </div>

      {/* Price and Duration */}
      <div className="my-2 flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 shadow-lg backdrop-blur-sm">
            <span className="text-lg font-semibold text-white">€</span>
            <Field
              name="price"
              type="number"
              step="0.01"
              className="w-full [appearance:textfield] bg-transparent text-lg font-semibold text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="499.99"
            />
          </div>
          <FormikErrorMessage
            name="price"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 shadow-lg backdrop-blur-sm">
            <Field
              name="duration"
              type="number"
              className="w-full [appearance:textfield] bg-transparent text-lg font-semibold text-white placeholder-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="5"
            />
            <span className="text-lg font-semibold text-white">Days</span>
          </div>
          <FormikErrorMessage
            name="duration"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Field
          name="description"
          as="textarea"
          rows={6}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-gray-300 placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none"
          placeholder="Full tour description..."
        />
        <FormikErrorMessage
          name="description"
          component="div"
          className="mt-1 text-sm text-red-400"
        />
      </div>

      {/* Type and Max Customers */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Type
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFieldValue("type", "tour")}
              className={`flex-1 rounded-lg border px-4 py-2 font-semibold transition-all ${
                values.type === "tour"
                  ? "border-primary-yellow bg-primary-yellow/20 text-primary-yellow"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              } backdrop-blur-sm`}
            >
              Tour
            </button>
            <button
              type="button"
              onClick={() => setFieldValue("type", "cruise")}
              className={`flex-1 rounded-lg border px-4 py-2 font-semibold transition-all ${
                values.type === "cruise"
                  ? "border-primary-yellow bg-primary-yellow/20 text-primary-yellow"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              } backdrop-blur-sm`}
            >
              Cruise
            </button>
          </div>
          <FormikErrorMessage
            name="type"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Max Customers
          </label>
          <Field
            name="maxCustomers"
            type="number"
            className="w-full [appearance:textfield] rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-white/40 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="20"
          />
          <FormikErrorMessage
            name="maxCustomers"
            component="div"
            className="mt-1 text-sm text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

export default TourFormFields;
