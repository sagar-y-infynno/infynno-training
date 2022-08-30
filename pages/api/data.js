import axios from 'axios';

export async function getData() {
  const init_url = "https://autodigg.com/ad-api/cars/list?usedCar=true&car_type=Used+car&page=1&radius=100&year=2011,2021&zip=&price_from=0&price_to=100000";

  const data = await axios.all([
    axios.get(init_url),
    axios.get(`${init_url}&return=count`),
    axios.get(`${init_url}&return=body_type`),
    axios.get(`${init_url}&return=exterior_color`),
    axios.get(`${init_url}&return=interior_color`),
    axios.get(`${init_url}&return=transmission`),
    axios.get(`${init_url}&return=drivetrain`),
    axios.get(`${init_url}&return=fuel_type`),
    axios.get(`${init_url}&return=features`),
    axios.get(`https://autodigg.com/ad-api/cars/list?return=make`),
    axios.get(`https://autodigg.com/ad-api/cars/list?make=&return=model`)
  ]);
  
  return { 
    data : data[0].data ? data[0].data : null,
    count : data[1].data ? data[1].data.count : null,
    filter : {
      body_type : data[2].data ? data[2].data : null, 
      exterior_color : data[3].data ? data[3].data : null,
      interior_color : data[4].data ? data[4].data : null,
      transmission : data[5].data ? data[5].data : null,
      drivetrain : data[6].data ? data[6].data : null,
      fuel_type : data[7].data ? data[7].data : null,
      features : data[8].data ? data[8].data : null,
      make : data[9].data ? Object.keys(data[9].data).map(k => ({name : k})) : null,
      model : data[10].data ? data[10].data : null
    }
  };
}

export default async function handler(req, res) {
  const jsonData = await getData();
  res.status(200).json(jsonData);
}