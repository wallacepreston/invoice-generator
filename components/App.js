import React from "react"
import data from '../data.json';
import dotenv from "dotenv";
dotenv.config();

// edit env var to change the hourly rate and total
const { REACT_APP_HOURLY_RATE: hourlyRate = 50 } = process.env;

const App = () => {
  const headers = Object.keys(data[0]);
  let grandTotal = 0;
  
  return (
    <div>
      <h1>Invoice</h1>

      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {
                      headers.map((header, idx) => <th key={idx} scope="col" className="px-2 py-3"> {header} </th>)
                    }
                    <th scope="col" className="px-2 py-3">Amount</th>
                  </tr>
              </thead>
              <tbody>
                {
                  data.map((item, idx) => {
                      const durationDecimal = item['Duration (decimal)'];
                      const totalLineItem = parseFloat(hourlyRate * durationDecimal).toFixed(2);
                      grandTotal += parseFloat(totalLineItem);
                      return <tr key={idx} className="bg-white border-b ">
                      {
                        headers.map((header, idx) => {
                          let value = item[header];
                          if(header === 'Billable Rate (USD)') {
                            value = hourlyRate;
                          }
                          return <td key={idx} className="px-2 py-2"> {value} </td>
                        })
                      }
                      <td className="px-2 py-2"> ${totalLineItem} </td>
                    </tr>
                    }
                  )
                }
                <tr className="bg-white border-b ">
                  <td className="px-2 py-2 font-bold text-gray-900 text-lg whitespace-nowrap">Total Invoice Amount</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="px-2 py-2 font-bold text-gray-900 text-lg whitespace-nowrap">${grandTotal}</td>
                </tr>
              </tbody>
          </table>
      </div>

      

    </div>
  )
}

export default App;