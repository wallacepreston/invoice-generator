import React from "react"
import { createRoot } from 'react-dom/client';

import data from './data.json';

function App() {
  console.log('>>>>>>>>> data', data);
  
  return (
    <div>
      <h1>Invoice</h1>
      {
        data.map((item) => {
          return (
            <div>
              <p>{item.Description}</p>
            </div>
          )
        })
      }

    </div>
  )
}
const root = createRoot(document.getElementById('root'));
root.render(
  <div>
    <App />
  </div>
);
