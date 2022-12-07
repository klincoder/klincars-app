// Import resources
import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Formik } from "formik";
import * as Yup from "yup";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomTextInputForm from "./CustomTextInputForm";
import CustomButton from "./CustomButton";
import CustomSelectForm from "./CustomSelectForm";
import CustomListItem from "./CustomListItem";
import CustomDatePickerForm from "./CustomDatePickerForm";
import CustomTimePickerForm from "./CustomTimePickerForm";
import { useAuthContext } from "../context/AuthContext";
import { appColors, appImages, testList } from "../config/data";

// Component
const FormTest = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { isMounted } = useAppSettings();

  // Define ref
  const coursesRef = useRef(null);

  // Debug
  //console.log("Debug formTest: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    fullName: "",
    courses: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
  };

  // Validate
  const validate = Yup.object().shape({
    fullName: Yup.string().required("Required").min(3, "Too short"),
    courses: Yup.object().required().nullable(),
    // gender: Yup.string().required("Required").min(8, "Too short"),
    // dateOfBirth: Yup.string().required("Required"),
    // timeOfBirth: Yup.string().required("Required"),
  });

  // FUNCTIONS
  // HANDLE COURSES REF
  const handleCoursesRef = useCallback(() => coursesRef.current?.present(), []);

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Debug
    console.log("Debug submitForm: ", values);
    setSubmitting(false);
  }; // close fxn

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={validate}
      >
        {({
          values,
          errors,
          isValid,
          isSubmitting,
          setFieldValue,
          handleSubmit,
        }) => {
          // Define variables
          // Return form fields
          return (
            <>
              {/** Debug */}
              {/* {console.log("Debug formValues: ", { values, errors })} */}

              {/** Full name */}
              <CustomTextInputForm label="Full name" name="fullName" />

              {/** Courses */}
              <CustomSelectForm
                name="coorses"
                label="Courses"
                sheetRef={coursesRef}
                placeholder={values.courses?.title || "Choose courses"}
                onPressSelect={handleCoursesRef}
                sheetContent={
                  <BottomSheetScrollView>
                    {/** Loop data */}
                    {testList?.map((item, index) => (
                      <CustomListItem
                        isLink
                        key={item?.id}
                        title={item?.title}
                        description={item?.description}
                        leftImage={item?.image}
                        onPressLink={useCallback(() => {
                          coursesRef.current.close();
                          setFieldValue("courses", item);
                        }, [])}
                        styleLinkContainer={
                          values.courses?.id === item?.id &&
                          tw`rounded-lg border-l-4 border-[${appColors?.primary}]`
                        }
                      />
                    ))}
                  </BottomSheetScrollView>
                }
              />

              {/** Pickup date & time */}
              <View style={tw`flex-1 flex-row`}>
                {/** Date of birth */}
                <CustomDatePickerForm
                  name="dateOfBirth"
                  label="Date of Birth"
                  styleContainer={tw`w-3/5`}
                />
                {/** Time of birth */}
                <CustomTimePickerForm
                  name="timeOfBirth"
                  label="Time"
                  styleContainer={tw`w-2/5`}
                />
              </View>

              {/** Submit button */}
              <CustomButton
                isNormal
                title="TEST BUTTON"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
              />
            </>
          );
        }}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormTest;
