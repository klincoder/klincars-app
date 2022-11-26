// Import resources
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// Import custom files
//import { activeCarsAtom } from "../recoil/atoms";
import { carsList, currSymbol } from "../config/data";
import { handleFormatNumber } from "../config/functions";

// Component
const useCarState = (rowData) => {
  // Define state
  const activeCars = carsList; //useRecoilValue(activeCarsAtom);
  const [tempCars, setTempCars] = useState(activeCars);

  // Define variables
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
  //console.log("Debug useCarState: ", );

  // FUNCTIONS
  // HANDLE SEARCH CARS
  const handleSearchCars = (val) => {
    // Define variables
    val = val?.toLowerCase();
    // If empty args, return
    if (!val?.length) return setTempCars(activeCars);
    // Define filter data
    const data = activeCars?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(val) ||
        item?.location?.toLowerCase().includes(val) ||
        item?.brand?.toLowerCase().includes(val)
    );
    const dataLen = data?.length;
    // If dataLen
    if (dataLen > 0) {
      setTempCars(data);
    } else {
      setTempCars(activeCars);
    } // close if data
  }; // close fxn

  // Return component
  return { tempCars, carInfo, handleSearchCars }; // close return
}; // close component

// Export
export default useCarState;
