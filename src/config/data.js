// Import resources
import moment from "moment";
import { Dimensions } from "react-native";
import { createTheme } from "@rneui/themed";
import tw from "twrnc";
import * as Application from "expo-application";

// Import custom files
import routes from "../screens/routes";
import logoImage from "../assets/logo.png";

// BASE URL
export const baseUrl = "https://klincoder.netlify.app";
//https://klincoder.com

// CURRENCY SYMBOL
export const currSymbol = { ngn: "₦", btc: "₿", usd: "$", gh: "GH₵" };

// COUNTRY FLAG URL
export const countryFlagUrl = "https://countryflagsapi.com/png";

// OTP DEFAULT TIMER
export const otpDefaultTimer = 59;

// JAVASCRIPT DATE
export const jsDate = new Date();

// Define screen info
export const screenInfo = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  scale: Dimensions.get("window").scale,
  fontScale: Dimensions.get("window").fontScale,
};

// APP COLORS
export const appColors = {
  primary: "#143109",
  secondary: "#F9F871",
  danger: "#ff5252",
  success: "#198754",
  error: "#dc3545",
  info: "#0dcaf0",
  warning: "#FFC107",
  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
  lightPrimary: "#2b6c14",
  veryLightPrimary: "#45ac20",
  lightSecondary: "#fafa85",
  veryLightSecondary: "#fbfb9d",
  lightDanger: "#FF8080",
  veryLightDanger: "#FFB3B3",
  lightSuccess: "#24C278",
  veryLightSuccess: "#68E3AA",
  lightGray: "#f5f5f5",
  lightBlack: "#333333",
};

// APP FONTS
export const appFonts = {
  regular: "Montserrat-Regular",
  medium: "Montserrat-Medium",
  light: "Montserrat-Light",
  thin: "Montserrat-Thin",
};

// APP IMAGES
export const appImages = {
  logo: logoImage,
  general: "https://placehold.co/600x400.png",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/klincoder-dev.appspot.com/o/avatar-default.png?alt=media&token=589b5b52-2bf3-42e1-994c-e89d1d203f9f",
  bankTransfer:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/bank-transfer.png?alt=media&token=47cb143a-8909-46d4-9123-9004eb09efbf",
  creditCard:
    "https://firebasestorage.googleapis.com/v0/b/bulkahia-dev.appspot.com/o/credit-card.png?alt=media&token=aa6bbc9b-37ee-413d-8150-649de975edef",
  onboarding:
    "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/speedometer-g33aa6cb3b_1920.jpg?alt=media&token=698a7fc7-50e1-4f2c-9e95-d51af126d420",
  onboarding2:
    "https://firebasestorage.googleapis.com/v0/b/klin-courier-dev.appspot.com/o/pexels-mizuno-k-13432001.jpg?alt=media&token=f94e5b20-4a75-4dc3-b7b3-2bbce9ca26b3",
};

// APP THEME
export const appTheme = createTheme({
  components: {
    mode: "light",
    lightColors: {
      primary: appColors?.primary,
    },
    darkColors: {
      primary: appColors?.black,
    },
    // Button: {
    //   titleStyle: { fontFamily: appFonts?.medium },
    // },
  },
});

// APP REGEX
export const appRegex = {
  phone: /^(?:\d{11})$/,
  numberDecimal: /^\d*(\.\d+)?$/,
  fiveDecimalPlaces: /^\d*(\.\d{1,5})?$/,
  digitsOnly: /^[0-9]+$/,
  cannotStartWithZero: /^(?:[1-9]\d*|0)$/,
};

// GLOBAL SCREEN OPTIONS
export const globalScreenOptions = {
  headerTintColor: "black",
  //headerTitleAlign: "center",
  headerTitleStyle: { color: "black", fontFamily: appFonts?.medium },
  headerStyle: {
    backgroundColor: `${appColors?.white}`,
    elevation: 0,
    shadowOpacity: 0,
  },
};

// ALERT MESSAGE
export const alertMsg = {
  generalErr: "Internal error. Please contact support.",
  generalSucc: "Action successful 👍",
  loginSucc: "Login successful 👍",
  loginErr: "Invalid credentials",
  regSucc: "Registration successful",
  isRequired: "All fields are required",
  isValidUser: "User already exist",
  inValidUser: "User not found",
  otpSent: "Otp sent successfully",
  otpErr: "Invalid code",
  profileSucc: "Profile updated",
  passRecoverySucc: "Password recovery successful",
  logoutConfirm: "Confirm logout",
  logoutSucc: "Logout successful",
  paymentSucc: "Payment successful",
  paymentErr: "Payment failed",
  emailExistErr: "Email address already exist",
  usernameExistErr: "Username not available",
  linkSentSucc: "We sent your verification link. Check your inbox or spam.",
};

// API ROUTES
export const apiRoutes = {
  otp: "mailjet-otp",
  welcome: "mailjet-welcome",
  login: "mailjet-login",
  newUser: "mailjet-new-user",
  passChange: "mailjet-pass-change",
  profileChange: "mailjet-profile-change",
};

/*************
  DATA
**************/
// ACCOUNT LIST
export const accountList = [
  {
    id: "123",
    title: "Edit Profile",
    leftIconType: "antDesign",
    leftIconName: "edit",
    slug: "edit-profile",
    isLink: true,
    link: routes.EDIT_PROFILE,
  },
  {
    id: "456",
    title: "Notifications",
    leftIconType: "feather",
    leftIconName: "bell",
    slug: "notifications",
    isLink: false,
  },
  {
    id: "789",
    title: "Customer Support",
    leftIconType: "fontAwesome",
    leftIconName: "support",
    slug: "customer-support",
    isLink: false,
  },
  {
    id: "1011",
    title: `Version (${Application.nativeApplicationVersion})`,
    leftIconType: "octIcons",
    leftIconName: "versions",
    slug: "app-version",
    isLink: false,
  },
];

// CARS LIST
export const carsList = [
  {
    id: "123",
    userID: "123456",
    title: "Lexus RX 350 2017 Red",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Accra",
    body: "suv",
    brand: "lexus",
    brandModel: "rx350",
    color: "red",
    condition: "ghanaian used",
    dateCreated: "2022-09-25T01:49:41Z",
    dateUpdated: "2022-09-25T01:49:41Z",
    engineSize: "2500 cc",
    fuel: "petrol",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-3.jpg?alt=media&token=a9ef5024-d0b0-4233-8c81-538fcbd8b9d8",
      "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-4.jpg?alt=media&token=fca1a04d-b218-4338-863f-11a0242bf558",
    ],
    mileage: 1530,
    registered: true,
    price: 300,
    priceType: "daily",
    seats: 4,
    slug: "lexus-rx-350-2017-red",
    status: "active",
    transmission: "automatic",
    year: 2017,
  },
  {
    id: "456",
    userID: "123456789",
    title: "Honda Accord 2015 Beige",
    description:
      "Lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum lorep ipsum.",
    location: "Kumasi",
    body: "salon",
    brand: "honda",
    brandModel: "beige",
    color: "gray",
    condition: "foreign used",
    dateCreated: "2022-10-15T18:28:07Z",
    dateUpdated: "2022-10-15T18:28:07Z",
    engineSize: "1800 cc",
    fuel: "petrol",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-1.jpg?alt=media&token=22493d8f-0f28-4ffc-937c-d8600c291dca",
      "https://firebasestorage.googleapis.com/v0/b/rentdrive-dev.appspot.com/o/car-2.jpg?alt=media&token=a327b235-515c-42e4-a4e8-a40c9f4293b9",
    ],
    mileage: 3548,
    registered: true,
    price: 450,
    priceType: "daily",
    seats: 4,
    slug: "honda-accord-2015-beige",
    status: "active",
    transmission: "automatic",
    year: 2015,
  },
  { id: "789", title: "3" },
  { id: "1011", title: "4" },
  { id: "1213", title: "5" },
  { id: "1415", title: "6" },
  { id: "1617", title: "7" },
  { id: "1819", title: "8" },
  { id: "2021", title: "9" },
  { id: "2122", title: "10" },
  { id: "2324", title: "11" },
  { id: "2526", title: "12" },
  { id: "2728", title: "13" },
  { id: "2930", title: "14" },
  { id: "3132", title: "15" },
];
