import { InputText } from "primereact/inputtext";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  placeholder: string;
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type: React.HTMLInputTypeAttribute;
  className?: string;
};

const Input = ({
  placeholder,
  type,
  register,
  label,
  error,
  className,
}: InputProps) => {
  return (
    <>
      {label && (
        <label
          className="uppercase tracking-widest text-xs"
          htmlFor={register.name}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={register.name}
        onFocus={
          type == "number"
            ? (e) =>
                e.currentTarget.addEventListener("wheel", (e) =>
                  e.preventDefault()
                )
            : undefined
        }
        placeholder={placeholder}
        required={register.required}
        {...register}
        className={`${className} relative block w-full min-w-[80px] appearance-none rounded-lg border border-slate-200 px-3 py-2 text-very-dark-violet placeholder-gray-400 focus:z-10 focus:border-very-dark-violet focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-very-dark-violet text-sm md:text-base ${
          error?.message
            ? "!border-input-error focus:!ring-input-error focus:!border-input-error"
            : ""
        }`}
        aria-invalid={error ? "true" : "false"}
      />
      <InputText type={type} placeholder={placeholder} required={register.required} id={register.name} className={`${className} relative block w-full min-w-[80px] appearance-none rounded-lg border border-slate-200 px-3 py-2 text-very-dark-violet placeholder-gray-400 focus:z-10 focus:border-very-dark-violet focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-very-dark-violet text-sm md:text-base ${
          error?.message
            ? "!border-input-error focus:!ring-input-error focus:!border-input-error"
            : ""
        }`} {...register} />

    </>
  );
};

export default Input;
