// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens or custom files
import SearchCarsScreen from "./SearchCarsScreen";
import { globalScreenOptions } from "../config/data";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
const SearchCarsNavigator = () => {
  // Define stackList
  const stackList = [
    {
      name: "SearchCarsScreen",
      component: SearchCarsScreen,
      options: { headerTitle: "Search" },
    },
  ];

  // Return component
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <>
        {/** Loop stackList */}
        {stackList?.map((item, index) => (
          <Stack.Screen
            key={item?.name + index + 1}
            name={item?.name}
            component={item?.component}
            options={item?.options}
          />
        ))}
      </>
    </Stack.Navigator>
  ); // close return
}; // close component

// Export
export default SearchCarsNavigator;
