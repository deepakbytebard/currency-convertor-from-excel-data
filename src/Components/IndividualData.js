import React, { useState } from "react";

export const IndividualData = ({
  individualExcelData,
  rates,

  base,
}) => {
  const [currentCurrency, setCurrentCurrency] = useState(
    individualExcelData?.Currency
  );

  const val = "USD" + currentCurrency;

  const price = (individualExcelData.Amount * rates[base]) / rates[val];
  const convertedPrice = price.toFixed(2);

  function isEmpty(x) {
    if (isNaN(x)) {
      return;
    }
    return x;
  }

  const baseData = base ? base.slice(3, 6) : "";

  return (
    <>
      {individualExcelData ? (
        <>
          <th>{individualExcelData.Name}</th>
          <th className="convertTo">{currentCurrency}</th>
          <th className="convertTo">{individualExcelData.Amount}</th>
          <th className="convertTo">
            {new Date(
              [individualExcelData["Transaction Date"] - 25569] * 86400 * 1000
            ).toDateString()}
          </th>

          <th className="convertTo">{baseData}</th>
          <th className="convertTo">{isEmpty(convertedPrice)}</th>
        </>
      ) : (
        "producst"
      )}
    </>
  );
};
