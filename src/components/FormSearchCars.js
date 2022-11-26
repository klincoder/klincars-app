// Import resources
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";

// Import custom files
import CustomText from "./CustomText";
import useAppSettings from "../hooks/useAppSettings";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import useCarState from "../hooks/useCarState";
import CustomTextInput from "./CustomTextInput";
import CustomBottomSheet from "./CustomBottomSheet";
import { useAuthContext } from "../context/AuthContext";
import { appColors, appFonts } from "../config/data";

// Component
const FormSearchCars = () => {
  // Define auth context
  const { user } = useAuthContext();

  // Define state
  const [searchVal, setSearchVal] = useState("");
  const { handleSearchCars } = useCarState();

  // Define app settings
  const { isMounted, navigation } = useAppSettings();

  // Define route
  const route = useRoute();

  // Define variables
  const isSearchScreen = route.name === "SearchCarsScreen";
  const filterRef = useRef(null);
  const filterSnapPoints = useMemo(() => ["60%"], []);

  // Debug
  //console.log("Debug formSearchCars: ", route);

  // FUNCTIONS
  // HANDLE SHOW FILTER
  const handleShowFilter = useCallback(() => filterRef.current?.present(), []);

  // Return component
  return (
    <View>
      {/** SEARCH AR CONTAINER */}
      <View style={tw`flex flex-row items-center justify-evenly bg-white`}>
        {/** Search bar input */}
        <CustomTextInput
          value={searchVal}
          onChangeText={(val) => {
            setSearchVal(val);
            handleSearchCars(val);
          }}
          leftIconType="feather"
          leftIconName="search"
          styleContainer={tw`-mt-4 -mb-5 w-10/12`}
          disabled={!isSearchScreen}
          autoFocus={true}
        />

        {/** Filter */}
        <CustomButton
          isTouchable
          onPress={handleShowFilter}
          disabled={!isSearchScreen}
        >
          <CustomIcon type="feather" icon="filter" size={28} />
        </CustomButton>
      </View>

      {/** MODAL - FILTER */}
      <CustomBottomSheet ref={filterRef} snapPoints={filterSnapPoints}>
        <CustomText>Filter</CustomText>
      </CustomBottomSheet>
    </View>
  ); // close return
}; // close component

// Export
export default FormSearchCars;
