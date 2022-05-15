import React from "react";

export const IndividualData = ({
  individualExcelData,
  rates,

  base,
}) => {
  function noData(x) {
    if (x === null || x === "") {
      return "";
    }
    return x;
  }

  const currentCurrency = noData(individualExcelData?.Currency);

  const val = "USD" + currentCurrency;

  const price =
    typeof individualExcelData.Amount === "number"
      ? (individualExcelData.Amount * rates[base]) / rates[val]
      : "invallid Number";
  const convertedPrice =
    typeof price === "number" ? price.toFixed(2) : "invalid Input";

  function isEmpty(x) {
    if (isNaN(x)) {
      return;
    }
    return x;
  }

  console.log(convertedPrice, "convery");

  const baseData = base ? base.slice(3, 6) : "";

  const convertTo = (baseData) => {
    if (noData(currentCurrency)) {
      return baseData;
    }
    return "";
  };

  var resultAmount = baseData ? convertedPrice : "";

  return (
    <>
      <th>{noData(individualExcelData.Name)}</th>
      <th className="convertTo">{noData(currentCurrency)}</th>
      <th className="convertTo">{noData(individualExcelData.Amount)}</th>
      <th className="convertTo">
        {individualExcelData["Transaction Date"] ? (
          <>
            {new Date(
              [individualExcelData["Transaction Date"] - 25569] * 86400 * 1000
            ).toDateString()}
          </>
        ) : (
          ""
        )}
      </th>

      <th className="convertTo">{convertTo(baseData)}</th>
      <th className="convertTo">{resultAmount}</th>
    </>
  );
};
