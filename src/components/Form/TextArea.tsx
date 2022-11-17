import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
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

      <InputTextarea
        placeholder={placeholder}
        required={register.required}
        id={register.name}
        rows={3}
        cols={20}
        autoResize
        className={classNames(
          { "p-invalid": error?.message },
          `${className}`
        )}
        {...register}
      />
    </>
  );
};

export default TextArea;
