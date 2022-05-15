import React from "react";
import { IndividualData } from "./IndividualData";

export const Data = ({ excelData, rates, base }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Name}>
      {individualExcelData.Name === undefined}
      {individualExcelData.Name !== undefined &&
        individualExcelData.Amount !== undefined &&
        individualExcelData["Transaction Date"] !== undefined &&
        individualExcelData.Currency !== undefined && (
          <IndividualData
            individualExcelData={individualExcelData}
            rates={rates}
            base={base}
          />
        )}
    </tr>
  ));
};
