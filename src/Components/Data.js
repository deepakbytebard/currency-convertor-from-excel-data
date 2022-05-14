import React from "react";
import { IndividualData } from "./IndividualData";

export const Data = ({ excelData, rates, base }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Name}>
      <IndividualData
        individualExcelData={individualExcelData}
        rates={rates}
        base={base}
      />
    </tr>
  ));
};
