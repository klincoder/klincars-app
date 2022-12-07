// Import resources
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRecoilValue } from "recoil";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";
import { carBookingAtom } from "../recoil/atoms";

// Component
const CarCheckoutScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define state
  const bookingVal = useRecoilValue(carBookingAtom);

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug carCheckoutScreen: ", bookingVal);

  // // SIDE EFFECTS
  // // SCREEN LAYOUT
  // useLayoutEffect(() => {
  //   // On mount
  //   isMounted.current = true;
  //   // Set screen options
  //   navigation.setOptions({
  //     headerTitleAlign: "left",
  //     headerRight: () => (
  //       <View style={tw`flex-1 flex-row items-center pr-5`}>
  //         <CustomText>Right Text</CustomText>
  //       </View>
  //     ), // close header right
  //   }); // close navigation
  //   // Clean up
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [navigation]);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-3`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>CarCheckoutScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default CarCheckoutScreen;
