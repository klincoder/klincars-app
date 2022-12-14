// Import resources
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import useAppSettings from "../hooks/useAppSettings";
import { useAuthContext } from "../context/AuthContext";

// Component
const OrderDetailsScreen = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define app settings
  const { todaysDate, navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug orderDetailsScreen: ",);

  // SIDE EFFECTS
  // SCREEN LAYOUT
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
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>OrderDetailsScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default OrderDetailsScreen;
