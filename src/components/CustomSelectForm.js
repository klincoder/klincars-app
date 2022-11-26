// Import resources
import React from "react";
import { useFormikContext } from "formik";
import tw from "twrnc";

// Import custom files
import CustomSelect from "./CustomSelect";

// Component
const CustomSelectForm = ({
  name,
  label,
  placeholder,
  sheetContent,
  ...rest
}) => {
  // Destructure useFormikContext
  const { values, errors, touched, handleChange, setFieldTouched } =
    useFormikContext();

  // Debug
  //console.log("Debug customSelectForm: ",)

  // Return component
  return (
    <CustomSelect
      {...rest}
      name={name}
      label={label}
      title={placeholder}
      errName={errors[name]}
      errTouched={touched[name]}
      sheetContent={sheetContent}
    />
  ); // close return
}; // close component

// Export
export default CustomSelectForm;
