import React from "react"
import data from '../data.json';
import dotenv from "dotenv";
dotenv.config();

// edit env var to change the hourly rate and total
const {
  REACT_APP_HOURLY_RATE: hourlyRate = 50,
} = process.env;

// format a float as a dollar amount with commas and decimal to 2 places
const formatDollarAmount = (amount) => {
  // coerce to number
  amount = +amount;
  // return formatted string
  return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}


const App = () => {
  const headers = Object.keys(data[0]);
  let grandTotal = 0;
  
  return (
    <div>

      {/* consultant name */}
      <div className="text-2xl font-light font-semibold">
        {process.env.REACT_APP_NAME}
      </div>
      <div className="mb-4 font-light text-gray-400">
        {process.env.REACT_APP_POSITION}
      </div>

      {/* consultant address */}
      <div className="my-4 bg-white">
        {process.env.REACT_APP_ADDRESS}
        <br/>
        {process.env.REACT_APP_CITY}, {process.env.REACT_APP_STATE} {process.env.REACT_APP_ZIP}
        <br/>
        {process.env.REACT_APP_PHONE}
        <br/>
        {process.env.REACT_APP_EMAIL}
      </div>

      <div className="text-xl font-light font-semibold">
        Invoice
      </div>

      {/* client info */}
      <div className="flex">
        <div className="w-1/2 p-4">
          <div className="bg-white border-solid border-2 border-gray-100 rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold">Invoice For:</div>
                <div className="font-bold">Project:</div>
                <div>{process.env.REACT_APP_CLIENT_COMPANY}</div>
                <div>{process.env.REACT_APP_CLIENT_PROJECT}</div>
                <div>{process.env.REACT_APP_CLIENT_ADDRESS}<br/>{process.env.REACT_APP_CLIENT_CITY}</div>
                <div></div>
                <div className="font-bold">{/* Header 4: */}</div>
                <div>{/* Data value 4 */}</div>
              </div>
            </div>
          </div>
        </div>

        {/* invoice info */}
        <div className="w-1/2 p-4">
          <div className="bg-white border-solid border-2 border-gray-100 rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold">Payable To:</div>
                <div className="font-bold">Submitted On:</div>
                <div>{process.env.REACT_APP_NAME}</div>
                <div>{(new Date()).toDateString()}</div>
                <div className="font-bold">Terms:</div>
                <div className="font-bold">{process.env.REACT_APP_INVOICE_NUMBER ? 'Invoice #' : ''}</div>
                <div>Net 15</div>
                <div>{process.env.REACT_APP_INVOICE_NUMBER}</div>
                {
                  process.env.REACT_APP_PO_NUMBER && <>
                    <div className="font-bold">PO #</div>
                    <div className="font-bold">{/* Item 6 Header */}</div>
                    <div>{process.env.REACT_APP_PO_NUMBER}</div>
                    <div>{/* Item 6 Data */}</div>
                  </>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {
                      headers.map((header, idx) => <th key={idx} scope="col" className="px-1 py-1"> {header} </th>)
                    }
                    <th scope="col" className="px-1 py-1">Amount</th>
                  </tr>
              </thead>
              <tbody>
                {
                  data.map((item, idx) => {
                      const durationDecimal = item.Decimal;
                      const totalLineItem = parseFloat(hourlyRate * durationDecimal).toFixed(2);
                      grandTotal += parseFloat(totalLineItem);
                      return <tr key={idx} className="bg-white border-b ">
                      {
                        headers.map((header, idx) => {
                          let value = item[header];
                          if(header === 'Rate') {
                            value = hourlyRate;
                          }
                          return <td key={idx} className="px-1 py-2"> {value} </td>
                        })
                      }
                      <td className="px-1 py-2"> {formatDollarAmount(totalLineItem)} </td>
                    </tr>
                    }
                  )
                }
                <tr className="bg-white border-b ">
                  <td className="px-1 py-2 font-bold text-gray-900 text-lg whitespace-nowrap">Total Invoice Amount</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="px-1 py-2 font-bold text-gray-900 text-lg whitespace-nowrap">{formatDollarAmount(grandTotal)}</td>
                </tr>
              </tbody>
          </table>
      </div>

      

    </div>
  )
}

export default App;