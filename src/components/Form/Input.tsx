import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
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

      <InputText
        type={type}
        id={register.name}
        placeholder={placeholder}
        required={register.required}
        onFocus={
          type == "number"
            ? (e) =>
                e.currentTarget.addEventListener("wheel", (e) =>
                  e.preventDefault()
                )
            : undefined
        }
        className={classNames(
          { "p-invalid": error?.message },
          `${className}`
        )}
        {...register}
      />
    </>
  );
};

export default Input;
