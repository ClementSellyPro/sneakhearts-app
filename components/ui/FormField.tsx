import { ChangeEventHandler } from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function FormField({
  label,
  type,
  name,
  value,
  error,
  required,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={`w-full px-3 py-2 outline-none border rounded-md focus:border-amber-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
