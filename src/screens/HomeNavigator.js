// Import resources
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "twrnc";

// Import custom files
import HomeScreen from "../screens/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import CustomIcon from "../components/CustomIcon";
import SearchCarsNavigator from "./SearchCarsNavigator";
import PostCarNavigator from "./PostCarNavigator";
import SavedNavigator from "./SavedNavigator";
import { appColors, appFonts } from "../config/data";
import CustomText from "../components/CustomText";

// Create bottom nav object
const Tab = createBottomTabNavigator();

// Component
const HomeNavigator = () => {
  // Define tabScreenList
  const tabScreenList = [
    {
      name: "HomeScreen",
      component: HomeScreen,
      iconType: "ionIcons",
      iconName: "home-outline",
      activeIcon: "home",
      label: "Home",
    },
    {
      name: "SearchCarsNavigator",
      component: SearchCarsNavigator,
      iconType: "feather",
      iconName: "search",
      activeIcon: "search",
      label: "Search",
    },
    // {
    //   name: "PostCarNavigator",
    //   component: PostCarNavigator,
    //   iconType: "antDesign",
    //   iconName: "plussquareo",
    //   activeIcon: "plussquare",
    //   label: "Post",
    // },
    {
      name: "SavedNavigator",
      component: SavedNavigator,
      iconType: "antDesign",
      iconName: "hearto",
      activeIcon: "heart",
      label: "Saved",
    },
    {
      name: "AccountNavigator",
      component: AccountNavigator,
      iconType: "fontAwesome5",
      iconName: "user",
      activeIcon: "user-alt",
      label: "Account",
    },
  ];

  // Return component
  // Screens for visible bottom tab
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`pb-1`,
      }}
    >
      {/** Loop tabScreenList */}
      {tabScreenList?.map((item, index) => (
        <Tab.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          component={item?.component}
          options={{
            tabBarLabel: ({ focused, color, position }) => (
              <CustomText
                style={[
                  tw`text-xs`,
                  { fontFamily: appFonts?.regular },
                  focused
                    ? tw`text-[${appColors?.primary}]`
                    : `text-[${color}]`,
                ]}
              >
                {item?.label}
              </CustomText>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <CustomIcon
                size={size}
                type={item?.iconType}
                name={focused ? item?.activeIcon : item?.iconName}
                color={focused ? appColors?.primary : color}
                style={tw`mt-1`}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  ); // close return
}; // close component

// Export component
export default HomeNavigator;
