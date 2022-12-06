// Import resources
import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Formik } from "formik";
import * as Yup from "yup";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Import custom files
import CustomText from "./CustomText";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomAlertModal from "./CustomAlertModal";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import CustomSelectForm from "./CustomSelectForm";
import CustomDatePickerForm from "./CustomDatePickerForm";
import CustomButton from "./CustomButton";
import CustomTimePickerForm from "./CustomTimePickerForm";
import CustomSpinner from "./CustomSpinner";
import CustomCarousel from "./CustomCarousel";

// Component
const FormCarBooking = ({ rowData }) => {
  // Define ref
  const pickupLocRef = useRef(null);
  const returnLocRef = useRef(null);

  // Define alert
  const alert = useCustomAlertState();

  // Define spinner
  const spinner = useCustomToastState();

  // Define variables
  const rowImage = rowData?.images;

  // Debug
  //console.log("Debug formCarBooking: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    pickupLoc: "",
    returnLoc: "",
    pickupDate: "",
    returnDate: "",
    driversLicense: "",
    addressProof: "",
  };

  // Validate
  const validate = Yup.object().shape({
    pickupLoc: Yup.string().required("Required"),
    returnLoc: Yup.string().required("Required"),
    pickupDate: Yup.string().required("Required"),
    returnDate: Yup.string().required("Required"),
    driversLicense: Yup.string().required("Required"),
    addressProof: Yup.string().required("Required"),
  });

  // FUNCTIONS
  // HANDLE PICKUP LOCATION SHEET
  const handlePickupLocSheet = useCallback(
    () => pickupLocRef.current?.present(),
    []
  );

  // HANDLE RETURN LOCATION SHEET
  const handleReturnLocSheet = useCallback(
    () => returnLocRef.current?.present(),
    []
  );

  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    // Debug
    console.log("Debug submitForm: ", values);
    // Set submitting
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
        {({ values, errors, isValid, isSubmitting, handleSubmit }) => {
          // Define variables
          // Return
          return (
            <>
              {/** Debug */}
              {/* {console.log("Debug formValues: ", values)} */}

              {/** Show spinner */}
              <CustomSpinner isLoading={spinner.loading || isSubmitting} />

              {/** Alert modal */}
              <CustomAlertModal
                visible={alert.visible}
                hideDialog={alert.hideAlert}
                cancelAction={alert.hideAlert}
                content={alert.message}
              />

              {/** Car image */}
              {/* <CustomCarousel data={rowImage} height={0.45} /> */}

              {/** CONTAINER */}
              <View style={tw`px-2 pt-5 mb-14`}>
                {/** Pickup location */}
                <CustomSelectForm
                  name="pickupLoc"
                  label="Pickup Location"
                  sheetRef={pickupLocRef}
                  onPressSelect={handlePickupLocSheet}
                  sheetContent={
                    <BottomSheetScrollView>
                      <CustomText>Locations here...</CustomText>
                    </BottomSheetScrollView>
                  }
                />

                {/** Return location */}
                <CustomSelectForm
                  name="returnLoc"
                  label="Return Location"
                  sheetRef={returnLocRef}
                  onPressSelect={handleReturnLocSheet}
                  sheetContent={
                    <BottomSheetScrollView>
                      <CustomText>Locations here...</CustomText>
                    </BottomSheetScrollView>
                  }
                />

                {/** Pickup date & time */}
                <View style={tw`flex-1 flex-row`}>
                  <CustomDatePickerForm
                    name="pickupDate"
                    label="Pickup Date"
                    styleContainer={tw`w-3/5`}
                  />
                  <CustomTimePickerForm
                    name="pickupTime"
                    label="Time"
                    styleContainer={tw`w-2/5`}
                  />
                </View>

                {/** Return date & time */}
                <View style={tw`flex-1 flex-row`}>
                  <CustomDatePickerForm
                    name="returnDate"
                    label="Return Date"
                    styleContainer={tw`w-3/5`}
                  />
                  <CustomTimePickerForm
                    name="returnTime"
                    label="Time"
                    styleContainer={tw`w-2/5`}
                  />
                </View>

                {/** Drivers license */}

                {/** Address proof */}

                {/** Submit button */}
                {/* <CustomButton
                  isNormal
                  title="Continue"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                /> */}
              </View>
            </>
          ); // close return
        }}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
}; // close component

// Export
export default FormCarBooking;
