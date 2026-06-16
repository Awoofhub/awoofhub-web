"use client"
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export const DatePickerField = ({ label, error, compulsory, value, onChange }: any) => {

  // Get 'now' so we can block the past
  const today = dayjs().add(1, 'day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl isInvalid={!!error} className="w-full mb-4">
        {label && (
          <FormLabel className="font-baloo text-lg">
            {label} {compulsory && <span className="text-red-500">*</span>}
          </FormLabel>
        )}

        <DatePicker
          value={value || null}
          onChange={(newValue) => onChange(newValue)}
          // THIS BLOCKS THE PAST:
          minDate={today}
          slotProps={{
            textField: {
              variant: 'standard',
              fullWidth: true,
              slotProps: {
                input: {
                  disableUnderline: true,
                  className: `!mt-2 !w-full !px-3 !py-[9px] !bg-[#F6F7F8] !border ${error ? '!border-red-500' : '!border-gray-300'
                    } !rounded-md !shadow-sm !font-baloo !text-lg focus-within:!border-orange-500`,
                },
                htmlInput: {
                  placeholder: "Select date",
                  className: "!font-baloo !text-lg !placeholder-gray-400 !py-0",
                }
              }
            },
            desktopPaper: {
              className: "!font-baloo",
            },
          }}
        />

        {/* This shows the error message if validation fails */}
        {error && (
          <FormHelperText className="text-red-500 text-left text-xs mt-1">
            {error.message || "Invalid date selected"}
          </FormHelperText>
        )}
      </FormControl>
    </LocalizationProvider>
  );
};