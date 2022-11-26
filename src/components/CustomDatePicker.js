// Import resources
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import custom files
import CustomText from "./CustomText";
import CustomListItem from "./CustomListItem";
import { appColors, appFonts, jsDate } from "../config/data";
import { handleFormatDate } from "../config/functions";

// Component
const CustomDatePicker = ({
  label,
  leftIconName,
  minDate,
  maxDate,
  ...rest
}) => {
  // Define state
  const [showDate, setShowDate] = useState(false);
  const [dateVal, setDateVal] = useState(new Date());

  // Define variables
  const dateStr = handleFormatDate(dateVal, 1);
  const tomorrow = handleDateAddDays(jsDate, 1);
  const tomorrowMax = handleDateAddDays(jsDate, 30);

  // Debug
  //console.log("Debug customDatePicker: ",)

  // FUNCTIONS
  // HANDLE SHOW DATE
  const handleShowDate = () => {
    setShowDate(true);
  }; // close fxn

  // HANDLE CHANGE DATE
  const handleChangeDate = (e, selectedDate) => {
    setShowDate(false);
    setDateVal(selectedDate);
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

      {/** Date picker */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={dateStr || "Pick date"}
        onPressLink={handleShowDate}
        lconName={leftIconName || "calendar"}
        containerStyle={tw`mx-3 border rounded-lg`}
      />

      {/** MODAL */}
      {showDate && (
        <DateTimePicker
          mode="date"
          value={dateVal}
          onChange={handleChangeDate}
          minimumDate={minDate || tomorrow}
          maximumDate={maxDate || tomorrowMax}
        />
      )}
    </View>
  ); // close return
}; // close component

// Export
export default CustomDatePicker;
