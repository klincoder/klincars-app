// Import resources
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "twrnc";

// Import custom files
import HomeScreen from "../screens/HomeScreen";
import AccountNavigator from "./AccountNavigator";
import CustomIcon from "../components/CustomIcon";
import SearchCarsNavigator from "./SearchCarsNavigator";
import PostCarNavigator from "./PostCarNavigator";
import SavedNavigator from "./SavedNavigator";
import { appColors } from "../config/data";

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
      //shifting={false}
      //sceneAnimationEnabled={false}
      labeled={true}
      activeColor={appColors?.primary}
      inactiveColor={appColors?.gray}
      screenOptions={{ headerShown: false }}
      barStyle={{
        color: appColors?.gray,
        backgroundColor: appColors?.white,
        borderTopWidth: 2,
        borderTopColor: appColors?.lightGray,
      }}
    >
      {/** Loop tabScreenList */}
      {tabScreenList?.map((item, index) => (
        <Tab.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          component={item?.component}
          options={{
            tabBarLabel: item?.label,
            tabBarLabelStyle: { color: "black", marginBottom: 5 },
            tabBarIcon: ({ focused, color }) => (
              <CustomIcon
                size={24}
                type={item?.iconType}
                icon={focused ? item?.activeIcon : item?.iconName}
                color={focused ? appColors?.primary : appColors?.gray}
                style={{ marginTop: 5 }}
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
