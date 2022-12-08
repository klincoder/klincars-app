// Import resources
import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomCarousel from "./CustomCarousel";
import CustomSwitch from "./CustomSwitch";
import CustomChip from "./CustomChip";
import { appColors, appFonts, carsList, homeCarousel } from "../config/data";

// Component
const HomeHeader = ({
  activeBrands,
  selectedBrand,
  onPressBrand,
  withDriverVal,
  onPressWithDriver,
}) => {
  // Debug
  //console.log("Debug homeHeader: ",);

  // Return component
  return (
    <>
      {/** Carousel */}
      <CustomCarousel
        data={homeCarousel}
        styleContainer={tw`mb-4 rounded-xl`}
      />

      {/** Horizontal list of brands - chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mt-2 mb-3`}
      >
        {/** Loop data */}
        {activeBrands?.map((item) => {
          // Define variables
          const isSelected = selectedBrand === item?.title?.toLowerCase();
          // Return
          return (
            <CustomChip
              key={item?.id}
              isSolid={isSelected}
              title={item?.title}
              onPress={() => onPressBrand(item?.title)}
              styleContainer={tw`mr-2`}
            />
          );
        })}
      </ScrollView>

      {/** With driver switch */}
      <View style={tw`mb-2`}>
        <CustomSwitch
          title="With driver"
          value={withDriverVal}
          onValueChange={onPressWithDriver}
        />
      </View>
    </>
  ); // close return
}; // close component

// Export
export default HomeHeader;
