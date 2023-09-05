/* eslint-disable react/prop-types */
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const TextInput = forwardRef(
  (
    { placeholder, type, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && (
          <span className="text-red-500 text-sm mt-1">{error.message}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
