"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Control, Form } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import { E164Number } from "libphonenumber-js/core";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface FormFieldProps {
  control: Control<any>;
  name: string;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  value?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: FormFieldProps;
}) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              className="ml-2"
              src={iconSrc}
              alt={iconAlt ?? "Field Icon"}
              height={24}
              width={24}
            />
          )}
          <FormControl>
            <Input
              className="shad-input border-0"
              {...field}
              placeholder={placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            className="input-phone"
            defaultCountry="BR"
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </FormControl>
      );
    case FormFieldType.DATEPICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            className="ml-2 h-auto"
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            width={24}
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            onSubmit={(e) => {
              console.log(e.target);
            }}
            {...field}
            placeholder={placeholder}
            disabled={props.disabled}
            className="shad-textArea"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="w-4 h-4"
            />
            <Label className="checkbox-label" htmlFor={props.name}>
              {props.label}
            </Label>
          </div>
        </FormControl>
      );
  }
};

const CustomFormField = (props: FormFieldProps) => {
  const { control, name, label, placeholder, fieldType } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
