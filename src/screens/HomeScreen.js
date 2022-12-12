// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import FormSearchCars from "../components/FormSearchCars";
import CustomButton from "../components/CustomButton";
import useCarState from "../hooks/useCarState";
import HomeHeader from "../components/HomeHeader";
import CarItem from "../components/CarItem";

// Component
const HomeScreen = () => {
  // Define state
  const {
    tempCars,
    selectedBrand,
    activeBrands,
    withDriver,
    handleSelectedBrand,
    handleWithDriver,
  } = useCarState();

  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  // Debug
  //console.log("Debug homeScreen: ", withDriver);

  // SIDE EFFECTS
  // SCREEN LAYOUT
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomButton
          isTouchable
          onPress={() => navigation.navigate(routes.SEARCH_CARS_NAVIGATOR)}
        >
          <FormSearchCars />
        </CustomButton>
      ), // close header
    }); // close navigation
    // Clean up
    return () => {
      isMounted.current = false;
    };
  }, [navigation, isMounted]);

  // Return component
  return (
    <CustomSafeView>
      {/** MAIN CONTAINER */}
      <View style={tw`px-3`}>
        {/** Flatlist of cars */}
        <FlatList
          data={tempCars}
          keyExtractor={(item) => item?.id}
          numColumns={2}
          initialNumToRender={12}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CarItem rowData={item} />}
          ListHeaderComponent={
            <HomeHeader
              activeBrands={activeBrands}
              selectedBrand={selectedBrand}
              onPressBrand={(e) => handleSelectedBrand(e)}
              withDriverVal={withDriver}
              onPressWithDriver={(e) => handleWithDriver(e)}
            />
          }
        />
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
