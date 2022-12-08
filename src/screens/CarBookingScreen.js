// Import resources
import React, { useRef, useCallback, useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";

// Import custom files
import routes from "./routes";
import CustomSafeView from "../components/CustomSafeView";
import useAppSettings from "../hooks/useAppSettings";
import useCarState from "../hooks/useCarState";
import CustomButton from "../components/CustomButton";
import CustomImage from "../components/CustomImage";
import useCustomAlertState from "../hooks/useCustomAlertState";
import useCustomToastState from "../hooks/useCustomToastState";
import CustomSelect from "../components/CustomSelect";
import CustomDatePicker from "../components/CustomDatePicker";
import LocationItem from "../components/LocationItem";
import CustomFilePicker from "../components/CustomFilePicker";
import useFilePickerState from "../hooks/useFilePickerState";
import PaymentMethodItem from "../components/PaymentMethodItem";
import StickyBottomView from "../components/StickyBottomView";
import { useAuthContext } from "../context/AuthContext";
import { appColors, locationList, paymentMethodList } from "../config/data";
import { carBookingAtom } from "../recoil/atoms";

// Component
const CarBookingScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Define ref
  const pickupLocRef = useRef(null);
  const returnLocRef = useRef(null);
  const paymentMethodRef = useRef(null);

  // Define row data
  const route = useRoute();
  const rowData = route.params?.rowData;

  // Define state
  const { carInfo } = useCarState(rowData);
  const [bookingVal, setBookingVal] = useRecoilState(carBookingAtom);
  const { fileInfo, selectedImage, handlePickImage } = useFilePickerState();

  // Define alert
  const alert = useCustomAlertState();

  // Define spinner
  const spinner = useCustomToastState();

  // Define useMemo
  const paymentMethodSnap = useMemo(() => ["30%"], []);

  // Debug
  //console.log("Debug carBookingScreen: ", selectedImage);

  // FORM CONFIG
  // Initial values
  const initialValues = {
    rowData: rowData,
    pickupLoc: bookingVal?.pickupLoc ? bookingVal?.pickupLoc : "",
    returnLoc: bookingVal?.returnLoc ? bookingVal?.returnLoc : "",
    startDate: bookingVal?.startDate ? bookingVal?.startDate : "",
    endDate: bookingVal?.endDate ? bookingVal?.endDate : "",
    proofOfId: bookingVal?.proofOfId ? bookingVal?.proofOfId : "",
    proofOfAddr: bookingVal?.proofOfAddr ? bookingVal?.proofOfAddr : "",
    proofOfAddr: bookingVal?.proofOfAddr ? bookingVal?.proofOfAddr : "",
    paymentMethod: bookingVal?.paymentMethod ? bookingVal?.paymentMethod : "",
  };

  // Validate
  const validate = Yup.object().shape({
    pickupLoc: Yup.object().required("Required").nullable(),
    returnLoc: Yup.object().required("Required").nullable(),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
    //proofOfId: Yup.string().required("Required"),
    //proofOfAddr: Yup.string().required("Required"),
    paymentMethod: Yup.string().required("Required"),
  });

  // Define useFormik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validate,
    onSubmit: async (values, { setSubmitting }) => {
      // Debug
      //console.log("Debug submitForm: ", values);
      // Set state
      //setBookingVal(values);
      setSubmitting(false);
      // Push too summary
      navigation.navigate(routes.CAR_CHECKOUT);
    }, // close fxn
  }); // close useFormik

  // FUNCTIONS
  // HANDLE PICKUP LOCATION SHEET
  const handlePickupLocSheet = useCallback(
    () => pickupLocRef.current?.present(),
    []
  ); // close fxn

  // HANDLE RETURN LOCATION SHEET
  const handleReturnLocSheet = useCallback(
    () => returnLocRef.current?.present(),
    []
  ); // close fxn

  // HANDLE PAYMENT METHOD SHEET
  const handlePaymentMethodSheet = useCallback(
    () => paymentMethodRef.current?.present(),
    []
  ); // close fxn

  // SIDE EFFECTS
  // SET BOOKING VALUES
  useEffect(() => {
    // If formik.dirty
    if (!formik.dirty) return;
    setBookingVal(formik.values);
  }, [formik.dirty, formik.values]);

  // Return component
  return (
    <CustomSafeView>
      {/** STICKY BOTTOM VIEW */}
      <StickyBottomView styleContainer={tw`items-center justify-center`}>
        <CustomButton
          isNormal
          title="Contnue"
          onPress={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
          styleNormalButton={tw`rounded-lg p-3 w-50 bg-[${appColors?.primary}]`}
        />
      </StickyBottomView>

      {/** SCROLL VIEW */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** Car image */}
        <CustomImage isLink image={carInfo?.image} style={tw`w-full h-50`} />

        {/** Form */}
        <View style={tw`px-1 pt-5 mb-20`}>
          {/** Pickup location */}
          <CustomSelect
            name="pickupLoc"
            label="Pickup Location"
            title={formik.values.pickupLoc?.title}
            leftIconType="feather"
            leftIconName="map-pin"
            onPressSelect={handlePickupLocSheet}
            onBlur={() => formik.setFieldTouched("pickupLoc")}
            isTouched={formik.touched.pickupLoc}
            errMsg={formik.errors.pickupLoc}
            sheetRef={pickupLocRef}
            sheetContent={
              <BottomSheetFlatList
                data={locationList}
                keyExtractor={(i) => i?.id}
                renderItem={({ item, index }) => (
                  <LocationItem
                    rowData={item}
                    rowIndex={index}
                    isSelected={formik.values.pickupLoc?.id === item?.id}
                    onPress={() => {
                      pickupLocRef.current.close();
                      formik.setFieldValue("pickupLoc", item);
                    }}
                  />
                )}
              />
            }
          />

          {/** Return location */}
          <CustomSelect
            name="returnLoc"
            label="Return Location"
            title={formik.values.returnLoc?.title}
            leftIconType="fontAwesome"
            leftIconName="paper-plane-o"
            onPressSelect={handleReturnLocSheet}
            errMsg={formik.errors.returnLoc}
            sheetRef={returnLocRef}
            sheetContent={
              <BottomSheetFlatList
                data={locationList}
                keyExtractor={(i) => i?.id}
                renderItem={({ item, index }) => (
                  <LocationItem
                    rowData={item}
                    rowIndex={index}
                    isSelected={formik.values.returnLoc?.id === item?.id}
                    onPress={() => {
                      returnLocRef.current.close();
                      formik.setFieldValue("returnLoc", item);
                    }}
                  />
                )}
              />
            }
          />

          {/** Pickup date & time */}
          <CustomDatePicker
            name="startDate"
            label="Pickup Date"
            title={formik.values.startDate}
            leftIconType="fontAwesome"
            leftIconName="calendar-plus-o"
            errMsg={formik.errors.startDate}
            onChangeDate={(e) => formik.setFieldValue("startDate", e)}
          />

          {/** Return date & time */}
          <CustomDatePicker
            name="endDate"
            label="Return Date"
            title={formik.values.endDate}
            leftIconType="fontAwesome"
            leftIconName="calendar-check-o"
            errMsg={formik.errors.endDate}
            onChangeDate={(e) => formik.setFieldValue("endDate", e)}
          />

          {/** Proof of id */}
          <CustomFilePicker
            name="proofOfId"
            label="Proof of Identity"
            title={formik.values.proofOfId}
            leftIconName="user"
            errMsg={formik.errors.proofOfId}
            helperText="E.g. Driver's license, National ID, Voter's card"
            // onPress={async () => {
            //   // Get info
            //   const getInfo = await handlePickImage();
            //   formik.setFieldValue("proofOfId", getInfo?.resFile1);
            // }}
          />

          {/** Proof of address */}
          <CustomFilePicker
            name="proofOfAddr"
            label="Proof of Address"
            title={formik.values.proofOfAddr}
            leftIconType="feather"
            leftIconName="map"
            errMsg={formik.errors.proofOfAddr}
            helperText="E.g. Bank Statement or Utility bill"
          />

          {/** Payment method */}
          <CustomSelect
            name="paymentMethod"
            label="Payment Method"
            title={formik.values.paymentMethod}
            leftIconType="antDesign"
            leftIconName="creditcard"
            onPressSelect={handlePaymentMethodSheet}
            errMsg={formik.errors.paymentMethod}
            sheetRef={paymentMethodRef}
            snapPoints={paymentMethodSnap}
            sheetContent={
              <BottomSheetView>
                {/** Loop data */}
                {paymentMethodList?.map((item) => (
                  <PaymentMethodItem
                    key={item?.id}
                    rowData={item}
                    isSelected={formik.values.paymentMethod === item?.title}
                    onPress={() => {
                      paymentMethodRef.current.close();
                      formik.setFieldValue("paymentMethod", item?.title);
                    }}
                  />
                ))}
              </BottomSheetView>
            }
          />
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarBookingScreen;
