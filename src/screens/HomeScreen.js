// Import resources
import React, { useLayoutEffect } from "react";
import { FlatList, View, ScrollView } from "react-native";
import tw from "twrnc";

// Import custom files
import routes from "./routes";
import useAppSettings from "../hooks/useAppSettings";
import CustomSafeView from "../components/CustomSafeView";
import FormSearchCars from "../components/FormSearchCars";
import CustomButton from "../components/CustomButton";
import CustomCarousel from "../components/CustomCarousel";
import CustomText from "../components/CustomText";
import CustomSwitch from "../components/CustomSwitch";
import useCarState from "../hooks/useCarState";
import { appColors, carsList } from "../config/data";

// Component
const HomeScreen = () => {
  // Define state
  const { tempCars } = useCarState();

  // Define app settings
  const { navigation, isMounted } = useAppSettings();

  const carBrandList = [
    "All",
    "Lexus",
    "Audi",
    "Homda",
    "Mercedes-Benz",
    "Toyota",
    "Kia",
    "Nissan",
    "Ford",
    "Hyundai",
    "BMW",
    "Chevrolet",
  ];

  // Debug
  //console.log("Debug homeScreen: ",);

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
  }, [navigation]);

  // Return component
  return (
    <CustomSafeView>
      {/** MAIN CONTAINER */}
      <View style={tw`px-3`}>
        {/** Flatlist of cars */}
        <FlatList
          data={tempCars}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          initialNumToRender={12}
          renderItem={({ item }) => (
            <View style={tw`flex-0.5 m-2 h-52 bg-[#ddd]`}>
              <CustomText style={tw`p-2 text-lg`}>{item?.title}</CustomText>
            </View>
          )}
          ListHeaderComponent={
            <>
              {/** Carousel */}
              <CustomCarousel
                data={carsList?.[0]?.images}
                styleContainer={tw`mb-4 rounded-xl`}
              />

              {/** Horizontal list of brands - chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`mb-4`}
              >
                {/** Loop data */}
                {carBrandList?.map((item) => (
                  <CustomText key={item} style={tw`p-2 mr-3 border`}>
                    {item}
                  </CustomText>
                ))}
              </ScrollView>

              {/** With driver switch */}
              <View style={tw`mb-4`}>
                <CustomSwitch title="With driver" />
              </View>
            </>
          }
        />
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default HomeScreen;
