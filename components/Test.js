import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Test() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const count = await axios.get(`https://autodigg.com/ad-api/cars/list?usedCar=true&car_type=Used+car&page=1&radius=100&year=2011%2C2021&return=count`);
      console.log(count.data.count);
    })();
  })

  return (
    <div>Test</div>
  )
}
