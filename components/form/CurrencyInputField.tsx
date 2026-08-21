import {
    FormControl,
    FormHelperText,
    FormLabel,
    forwardRef,
    Input
} from "@chakra-ui/react";

import { FieldError, UseFormRegister } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type CurrencyInputFieldProps = {
    label?: string;
    error?: FieldError;
    placeholder?: string;
    compulsory?: boolean;
    labelClassName?: string;
    className?: string;
} & Partial<ReturnType<UseFormRegister<Record<string, unknown>>>>;

export const CurrencyInputField = forwardRef((props: CurrencyInputFieldProps, ref) => {
    const {
        label,
        error,
        placeholder,
        compulsory,
        labelClassName,
        className,
        onChange,
        ...inputProps
    } = props;

    return (
        <FormControl>
            {label && (
                <FormLabel
                    className={labelClassName ?? "font-baloo text-sm lg:text-lg"}
                >
                    {label}
                    {compulsory && <span className="text-red-500"> *</span>}
                </FormLabel>
            )}

            <NumericFormat
                // This tells NumericFormat to use your exact Chakra + Tailwind InputField as the base!
                customInput={Input}
                inputMode="numeric"
                // Number formatting configs
                thousandSeparator=","
                bg="white"
                placeholder={placeholder}
                className={`mt-2 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base ${className ?? ""}`}
                // Forward form registration props and refs
                getInputRef={ref}
                {...inputProps}
                onValueChange={(values) => {
                    onChange?.({
                        target: {
                            name: inputProps.name as string,
                            value: values.floatValue, // Returns a raw number (e.g., 1234567) or undefined if empty
                        },
                    } as any);
                }}
            />

            {error && (
                <FormHelperText className="text-red-500 text-left text-xs mt-1">
                    {error.message}
                </FormHelperText>
            )}
        </FormControl>
    );
});