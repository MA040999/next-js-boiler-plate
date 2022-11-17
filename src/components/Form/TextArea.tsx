import { InputTextarea } from "primereact/inputtextarea";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  placeholder: string;
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

const TextArea = ({
  placeholder,
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

        <InputTextarea placeholder={placeholder} required={register.required} id={register.name} rows={3} cols={20} className={`${className} relative block w-full min-w-[80px] appearance-none rounded-lg border border-slate-200 px-3 py-2 text-very-dark-violet placeholder-gray-400 focus:z-10 focus:border-very-dark-violet focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-very-dark-violet text-sm md:text-base ${
          error?.message
            ? "!border-input-error focus:!ring-input-error focus:!border-input-error"
            : ""
        }`} {...register} />

    </>
  );
};

export default TextArea;
