import React, { useState, useEffect } from "react";
import { Data } from "./Components/Data";
import * as XLSX from "xlsx";
import axios from "axios";
import { currencyData } from "./data";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function App() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        setExcelData(e.preventDefault());
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError(
          "Please select either excel or csv or xslx file's types"
        );
        setExcelFile("");
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  // All about current and updated currency
  const [rates, setRates] = useState([]);
  const [base, setBase] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/currency_data/live?base=USD&symbols=INR,GBP&apikey=2dwOEjeqYFPaZxM2R1BaHVNscpCOoENx"
      )
      .then((response) => {
        setRates(response?.data?.quotes);
      });
  }, []);

  const updatedRates = rates ? currencyData[0]?.quotes : rates;

  const newCurrency = Object.keys(updatedRates);

  return (
    <div className="container">
      {/* upload file section */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: 5 + "px" }}>
              {excelFileError}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-succ"
            style={{ marginTop: 5 + "px" }}
          >
            Submit
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}

      <div className="viewer">
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div className="table-responsive">
            <div className="convert-btn">
              <h5>Convert Current Currency to</h5>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  setBase(value);
                }}
              >
                {newCurrency.map((currency) => (
                  <option value={currency}>{currency.slice(3, 6)}</option>
                ))}
              </select>
            </div>
            {excelData && (
              <div>
                <table className="table" id="table-to-excel">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th className="convertTo" scope="col">
                        Currency
                      </th>
                      <th className="convertTo" scope="col">
                        Amount
                      </th>
                      <th className="convertTo" scope="col">
                        Transaction Date
                      </th>
                      <th className="convertTo" scope="col">
                        Convert To
                      </th>
                      <th className="convertTo" scope="col">
                        Converted Amout
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {excelData && ( */}
                    <Data
                      excelData={excelData}
                      rates={updatedRates}
                      base={base}
                    />
                  </tbody>
                </table>
                <div className="buttons">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-excel"
                    filename="tablexls"
                    sheet="currencyConvertor"
                    buttonText="Export Data to Excel Sheet"
                  />
                  <button
                    className="reset-btn"
                    onClick={() => setExcelData(null)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
