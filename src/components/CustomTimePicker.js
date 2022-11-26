// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import { appColors, appFonts, newDate } from "../config/data";
import { handleFormatDate } from "../config/functions";

// Component
const CustomDatePicker = ({
  label,
  leftIconName,
  minDate,
  maxDate,
  sheetRef,
  snapPoints,
  ...rest
}) => {
  // Define state
  const [showTime, setShowTime] = useState(false);
  const [timeVal, setTimeVal] = useState(new Date());

  // Define variables
  const timeStr = handleFormatDate(timeVal, 4);

  // Debug
  //console.log("Debug customDatePicker: ",)

  // FUNCTIONS
  // HANDLE SHOW TIME
  const handleShowTime = () => {
    setShowTime(true);
  }; // close fxn

  // HANDLE CHANGE TIME
  const handleChangeTime = (e, selectedTime) => {
    setShowTime(false);
    setTimeVal(selectedTime);
  }; // close fxn

  // Return component
  return (
    <View style={tw`mb-3`}>
      {/** Label */}
      {label && (
        <CustomText style={[tw`mb-1 mx-3`, { fontFamily: appFonts?.medium }]}>
          {label}
        </CustomText>
      )}

      {/** Time picker */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={timeStr || "Pick time"}
        onPressLink={handleShowTime}
        lconName={leftIconName || "clockcircleo"}
        containerStyle={tw`mx-3 border rounded-lg`}
      />

      {/** MODAL */}
      {showTime && (
        <DateTimePicker
          mode="time"
          value={dateVal}
          onChange={handleChangeTime}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomDatePicker;
