// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import tw from "twrnc";

// Import custom files
import { globalScreenOptions } from "../config/data";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import HomeNavigator from "../screens/HomeNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
import CarDetailsScreen from "./CarDetailsScreen";
import CarBookingScreen from "./CarBookingScreen";
import CarCheckoutScreen from "./CarCheckoutScreen";
import CarCompleteScreen from "./CarCompleteScreen";
import OrdersScreen from "./OrdersScreen";
import OrderDetailsScreen from "./OrderDetailsScreen";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
const AppNavigator = ({ userID }) => {
  // Define appStackList
  const appStackList = [
    {
      name: "HomeNavigator",
      component: HomeNavigator,
      options: { headerShown: false },
    },
    {
      name: "EditProfileScreen",
      component: EditProfileScreen,
      options: { headerTitle: "Edit Profile" },
    },
    {
      name: "CarDetailsScreen",
      component: CarDetailsScreen,
      options: { headerTitle: "Details" },
    },
    {
      name: "CarBookingScreen",
      component: CarBookingScreen,
      options: { headerTitle: "Booking" },
    },
    {
      name: "CarCheckoutScreen",
      component: CarCheckoutScreen,
      options: { headerTitle: "Checkout" },
    },
    {
      name: "CarCompleteScreen",
      component: CarCompleteScreen,
      options: { headerTitle: "Complete", headerShown: false },
    },
    {
      name: "OrdersScreen",
      component: OrdersScreen,
      options: { headerTitle: "Orders" },
    },
    {
      name: "OrderDetailsScreen",
      component: OrderDetailsScreen,
      options: { headerTitle: "Order Details" },
    },
  ];

  // Define authStackList
  const authStackList = [
    {
      name: "OnboardingScreen",
      component: OnboardingScreen,
      options: { headerShown: false },
    },
    {
      name: "LoginScreen",
      component: LoginScreen,
      options: { headerShown: false },
    },
    {
      name: "RegisterScreen",
      component: RegisterScreen,
      options: { headerShown: false },
    },
    {
      name: "PasswordRecoveryScreen",
      component: PasswordRecoveryScreen,
      options: { headerShown: false },
    },
  ];

  // Return component
  // Screens to hide bottom tab
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={globalScreenOptions}
    >
      <>
        {/** If userID */}
        {true ? (
          <>
            {/** Loop appStackList */}
            {appStackList?.map((item, index) => (
              <Stack.Screen
                key={item?.name + index + 1}
                name={item?.name}
                component={item?.component}
                options={item?.options}
              />
            ))}
          </>
        ) : (
          <>
            {/** Loop authStackList */}
            {authStackList?.map((item, index) => (
              <Stack.Screen
                key={item?.name + index + 1}
                name={item?.name}
                component={item?.component}
                options={item?.options}
              />
            ))}
          </>
        )}
      </>
    </Stack.Navigator>
  ); // close return
}; // close component

// Export
export default AppNavigator;
