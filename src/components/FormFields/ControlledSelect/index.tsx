import { memo, useCallback, useMemo } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import {
  GroupBase,
  OnChangeValue,
  Props as SelectProps,
  Select,
} from "chakra-react-select";

import { handleEmptyOptions } from "./handleEmptyOptions";
import { chakraStyles, customComponents } from "./styles";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<
      SelectProps<Option, IsMulti, Group>,
      "name" | "defaultValue"
    >,
    UseControllerProps<FormValues> {
  /**
   * A label to use in the FormLabel component in the
   * Select's FormControl
   */
  label?: string;
}

function ControlledSelectComponent<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ControlledSelectProps<
    FormValues,
    Option,
    IsMulti,
    Group
  >
) {
  const {
    options,
    name,
    label,
    control,
    rules,
    shouldUnregister,
    required,
    isRequired,
    ...selectProps
  } = props;

  const {
    field, // contains: onChange, onBlur, value, name, ref
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const value = useMemo(
    () =>
      options?.find(
        (option) => option?.value === field?.value
      ),
    [field?.value, options]
  );

  const handleChange = useCallback(
    (option: OnChangeValue<Option, IsMulti>) => {
      field.onChange(option?.value);
    },
    [field]
  );

  return (
    <FormControl
      id={`react-select-${name}-input`} // react-select uses this id to associate the label with the input
      label={label}
      isInvalid={!!error}
      isRequired={required || isRequired}
      cursor="pointer"
    >
      {label && <FormLabel>{label}</FormLabel>}

      <Select<Option, IsMulti, Group>
        instanceId={name}
        options={options}
        defaultValue={null}
        openMenuOnFocus
        chakraStyles={chakraStyles()}
        components={customComponents()}
        noOptionsMessage={handleEmptyOptions}
        {...selectProps}
        {...field}
        value={value}
        onChange={handleChange}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

/**
 * Chakra-react-select form component
 *
 * @param props - The combined props of the
 *   chakra-react-select component and the useController
 *   hook from react-hook-form
 */
export const ControlledSelect = memo(
  ControlledSelectComponent
) as typeof ControlledSelectComponent;
