// Import resources
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// Import custom files
//import { activeCarsAtom } from "../recoil/atoms";
import { carBrandList, carsList, currSymbol } from "../config/data";
import { handleFormatNumber } from "../config/functions";

// Component
const useCarState = (rowData) => {
  // Define state
  const activeCars = carsList; //useRecoilValue(activeCarsAtom);
  const activeBrands = carBrandList; //useRecoilValue(activeBrandsAtom);
  const [tempCars, setTempCars] = useState(activeCars);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [withDriver, setWithDriver] = useState(false);

  // Define variables
  const tempCarsLen = tempCars?.length;
  const carInfo = {
    id: rowData?.id,
    userID: rowData?.userID,
    title: rowData?.title,
    desc: rowData?.description,
    location: rowData?.location,
    image: rowData?.images?.[0],
    images: rowData?.images,
    imagesLen: rowData?.images?.length,
    condition: rowData?.condition,
    transmission: rowData?.transmission,
    mileage: rowData?.mileage,
    price: rowData?.price,
    priceType: rowData?.priceType,
    priceFormat: currSymbol?.gh + handleFormatNumber(rowData?.price),
    slug: rowData?.slug,
    body: rowData?.body,
    brand: rowData?.brand,
    brandModel: rowData?.brandModel,
    color: rowData?.color,
    engineSize: rowData?.engineSize,
    fuel: rowData?.fuel,
    registered: rowData?.registered === true ? "Yes" : "No",
    seats: rowData?.seats,
    year: rowData?.year,
  };

  // Debug
  //console.log("Debug useCarState: ", tempCars?.length);

  // FUNCTIONS
  // HANDLE SEARCH CARS
  const handleSearchCars = (val) => {
    // Define variables
    val = val?.toLowerCase();
    // If empty args, return
    if (!val?.length) return setTempCars(activeCars);
    // Filter cars
    const result = activeCars?.filter(
      (i) =>
        i?.title?.toLowerCase().includes(val) ||
        i?.location?.toLowerCase().includes(val) ||
        i?.brand?.toLowerCase().includes(val)
    );
    const resultLen = result?.length;
    // If resultLen
    if (resultLen > 0) {
      setTempCars(result);
    } else {
      setTempCars(activeCars);
    } // close if
  }; // close fxn

  // HANDLE SELECTED BRAND
  const handleSelectedBrand = (val) => {
    // Define variables
    val = val?.toLowerCase();
    // If empty args, return
    if (!val) return null;
    // Set selected brand
    setSelectedBrand(val);
    // Filter cars where brand === val
    const result = activeCars?.filter((i) => i?.brand === val);
    const resultLen = result?.length;
    // If val === all
    if (val === "all") {
      setTempCars(activeCars);
    } else if (resultLen > 0) {
      setTempCars(result);
    } else {
      setTempCars([]);
    } // close if
  }; // close fxn

  // HANDLE WITH DRIVER
  const handleWithDriver = (val) => {
    // Set state
    setWithDriver(!withDriver);
    // Filter cars where withDriver === true
    const result = activeCars?.filter((i) => i?.withDriver === true);
    const resultLen = result?.length;
    // If val && resultLen > 0
    if (val === true && resultLen > 0) {
      setTempCars(result);
    } else if (val === false) {
      setTempCars(activeCars);
    } else {
      setTempCars([]);
    } // close if
  }; // close fxn

  // Return component
  return {
    tempCars,
    carInfo,
    selectedBrand,
    activeBrands,
    withDriver,
    handleSearchCars,
    handleSelectedBrand,
    handleWithDriver,
  }; // close return
}; // close component

// Export
export default useCarState;
