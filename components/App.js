import React from "react"
import data from '../data.json';

const App = () => {
  
  return (
    <div>
      <h1>Invoice</h1>
      {
        data.map((item, idx) => <div key={idx}>
              <p>{item.Description}</p>
            </div>
        )
      }

    </div>
  )
}

export default App;