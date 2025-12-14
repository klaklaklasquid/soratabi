import React from "react";

// Define the component and its props using the Generic T
// T represents the type of the value (string or number)
function InputButton<T extends string | number | undefined>({
  type,
  placeholder,
  min,
  max,
  state,
  setState,
}: InputButtonProps<T>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (setState) {
      const value = e.target.value;

      // Determine if the value needs to be converted to a number
      if (type === "number") {
        // If the input is empty, set the state to 0 or handle as needed
        if (value === "") {
          setState(0 as T);
        } else {
          // Convert the string to a number
          const numericValue = Number(value);
          if (!isNaN(numericValue)) {
            setState(numericValue as T);
          }
        }
      } else {
        // Otherwise, treat it as a string
        setState(value as T);
      }
    }
  }

  // Ensure the input's value attribute always receives a string, even if the state is a number
  const inputValue = state !== undefined ? String(state) : "";

  return (
    <input
      type={type || "text"}
      min={min}
      max={max}
      onChange={handleChange}
      value={inputValue}
      placeholder={placeholder}
      className="focus:border-tertiary-blue focus:ring-tertiary-blue/20 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-center text-sm text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 outline-none hover:border-white/30 focus:bg-white/15 focus:ring-2 sm:text-base"
    />
  );
}

// Update the props interface to use the Generic T
interface InputButtonProps<T extends string | number | undefined> {
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;

  // The state and setState types are now linked by T
  state?: T;
  setState?: React.Dispatch<React.SetStateAction<T>>;
}

export default InputButton;
