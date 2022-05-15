import React from "react";
import { IndividualData } from "./IndividualData";

export const Data = ({ excelData, rates, base }) => {
  return excelData.map((individualExcelData) => (
    <>
      {individualExcelData.Name === undefined}
      {individualExcelData.Name !== undefined &&
        individualExcelData.Amount !== undefined &&
        individualExcelData["Transaction Date"] !== undefined &&
        individualExcelData.Currency !== undefined && (
          <tr key={individualExcelData.Name}>
            <IndividualData
              individualExcelData={individualExcelData}
              rates={rates}
              base={base}
            />
          </tr>
        )}
    </>
  ));
};
