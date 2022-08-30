import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from 'axios';

const api_base = process.env.REACT_APP_API_BASE;

export const changePage = createAsyncThunk('cars/getNextPage', async (cars) => {
  const { selected_filter, page } = cars;
  const res = {};
  console.log("=========================");
  // console.log(cars);
  // console.log(page);
  // console.log(selected_filter);
  
  let init_url = `https://autodigg.com/ad-api/cars/list?usedCar=true&car_type=&page=1&radius=100&year=2011,2021&zip=&price_from=0&price_to=100000`;

  let no_features_url = init_url;

  if(cars.exclude) {
    if(!cars.exclude.includes("page")){
      page = 1;
    }
  }

  if(selected_filter && page) {
    init_url = `https://autodigg.com/ad-api/cars/list?usedCar=true&car_type=${selected_filter.car_type}&page=${page}&radius=${selected_filter.radius}&year=${selected_filter.year}&zip=${selected_filter.zip}&price_from=${selected_filter.price_from}&price_to=${selected_filter.price_to}&body_type=${selected_filter.body_type.join(",")}&exterior_color=${selected_filter.exterior_color.join(",")}&interior_color=${selected_filter.interior_color.join(",")}&features=${Object.keys(selected_filter.features).map(filter => selected_filter.features[filter].join(",")).filter(f => f = f).join(",")}`;
    init_url += Array.isArray(selected_filter.make) && selected_filter.make.length > 0 ? `&make=${selected_filter.make.map(mk => mk.name).join(",")}` : "&make=";
    init_url += Array.isArray(selected_filter.model) && selected_filter.model.length > 0 ? `&model=${selected_filter.model.join(",")}` : "&model=";
    no_features_url = `https://autodigg.com/ad-api/cars/list?usedCar=true&car_type=${selected_filter.car_type}&page=${page}&radius=${selected_filter.radius}&year=${selected_filter.year}&zip=${selected_filter.zip}&price_from=${selected_filter.price_from}&price_to=${selected_filter.price_to}&body_type=${selected_filter.body_type.join(",")}`
    no_features_url += Array.isArray(selected_filter.make) && selected_filter.make.length > 0 ? `&make=${selected_filter.make.map(mk => mk.name).join(",")}` : "&make=";
    no_features_url += Array.isArray(selected_filter.model) && selected_filter.model.length > 0 ? `&model=${selected_filter.model.join(",")}` : "&model=";
  }

  // console.log(init_url ," - init url 1111");
  // console.log(page ," - page");

  res.data = await axios.get(init_url);
  res.count = await axios.get(`${init_url}&return=count`);
  // console.log(res ," :- res");

  
  if(cars.selected_filter["exterior_color"].length === 0) {
    res.exterior_color = await axios.get(`${init_url}&return=exterior_color`);
  }
  if(cars.selected_filter["body_type"].length === 0) {
    res.body_type = await axios.get(`${init_url}&return=body_type`);
  }
  if(cars.selected_filter["interior_color"].length === 0) {
    res.interior_color = await axios.get(`${init_url}&return=interior_color`);
  }
  if(cars.selected_filter["transmission"].length === 0) {
    res.transmission = await axios.get(`${init_url}&return=transmission`);
  }
  if(cars.selected_filter["drivetrain"].length === 0) {
    res.drivetrain = await axios.get(`${init_url}&return=drivetrain`);
  }
  if(cars.selected_filter["fuel_type"].length === 0) {
    res.fuel_type = await axios.get(`${init_url}&return=fuel_type`);
  }
  if(cars.selected_filter["model"].length === 0) {
    res.model = await axios.get(`${init_url}&return=model`);
  }
  res.features = await axios.get(`${no_features_url}&return=features`);

  if(!cars.filter) {
    res.make = await axios.get(`${init_url}&return=make`);
  }

  // console.log(res, " : res");
  
  return {
    exclude : cars.exclude ? cars.exclude : "" ,
    data: res.data ? res.data.data : cars.data, 
    count: res.count ? res.count.data.count : cars.count, 
    filter : {
      body_type : res.body_type ? res.body_type.data : cars.filter.body_type,
      exterior_color : res.exterior_color ? res.exterior_color.data : cars.filter.exterior_color,
      interior_color : res.interior_color ? res.interior_color.data : cars.filter.interior_color,
      transmission : res.transmission ? res.transmission.data : cars.filter.transmission,
      drivetrain : res.drivetrain ? res.drivetrain.data : cars.filter.drivetrain,
      fuel_type : res.fuel_type ? res.fuel_type.data : cars.filter.fuel_type,
      model : res.model ? res.model.data : cars.filter.model,
      features : res.features ? res.features.data : cars.filter.features,
      make : res.make ? res.make.data : cars.filter.make
    }
  };
});

const carsSlice = createSlice({
  name: "cars",
  initialState : {
    data : [],
    count: 0,
    page: 1,
    filter: [],
    selected_filter: {
      usedCar: true,
      car_type : "Used Car",
      year: "2011,2021",
      radius: "100",
      zip: "",
      price_from: 0,
      price_to: 100000,
      mileage: '',
      model: [],
      make: [],
      body_type : [], 
      exterior_color : [],
      interior_color : [],
      transmission : [],
      drivetrain : [],
      fuel_type : [],
      features: {
        'Interior Features': [],
        'Technology Features': [],
        'Safety Features': [],
        'Exterior Features': [],
        Others : []
      }
    }
  },
  reducers : {
    setCars: (state, action) => {
      state.data = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    setAll: (state, {payload}) => {
      state.count = payload.count;
      state.data = payload.data
      state.filter = payload.filter;
    },
    pageNext : (state) => { state.page = state.page < count ? state.page - 1 : count },
    pagePrev : (state) => { state.page = state.page > 1 ? state.page - 1 : 1 },
    setPage : (state, action) => { state.page = action.payload },
    setFilter : (state, action) => { state.filter = action.payload },
    changeFilter : (state, action) => { state.selected_filter = action.payload },
    changeFilterMake : (state, action) => { state.selected_filter.make = action.payload }
  },
  extraReducers: {
    [changePage.pending] : (state) => {
      state.isLoading = true;
    },
    [changePage.fulfilled] : (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;

      // console.log("action.payload : ");
      // console.log(action.payload, "filled");
      // console.log(state, "state");

      state.filter = {...action.payload.filter, make: state.filter.make ? [...state.filter.make] : action.payload.filter.make };
      

      if(action.payload.exclude) {
        if(!action.payload.exclude.includes("page")){
          state.page = 1;
        }
      }

      // if(state.filter.make) {
      //   if(action.payload.exclude) {
      //     if(action.payload.exclude.includes("make")) {
      //       state.filter = {...action.payload.filter, make: [...state.filter.make] };
      //     }
      //     //   state.filter = {...action.payload.filter, make: [...state.filter.make], model: {...state.filter.model}};
      //     // }else {
      //     //   state.filter = {...action.payload.filter, make: [...state.filter.make]};
      //     // }
      //     // console.log(action.payload, "payload from filter changes");
      //     // console.log({...action.payload.filter, make: [...state.filter.make], ...action.payload.exclude.map(ex => {
      //       //   return {[ex] : {...state.filter[ex]}}
      //       // })[0]}, "filter changes");
      //       // state.filter = {...action.payload.filter, make: [...state.filter.make], ...action.payload.exclude.map(ex => {
      //       //   return {[ex] : {...state.filter[ex]}}
      //       // })[0]};
      //     // let filter_state = {...action.payload.exclude.map(ex => {
      //     //   return {[ex] : {...state.filter[ex]}}
      //     // })[0]};
      //     //   // console.log(filter_state, "changes state from filter changes");
            
      //     // state.filter = {...action.payload.filter, make: [...state.filter.make], ...filter_state};
      //   }else {
      //     state.filter = {...action.payload.filter, make: [...state.filter.make]};
      //   }
      // }

    },
    [changePage.rejected] : (state) => {
      state.isLoading = false;
    },
    [HYDRATE] : (state, action) => {
      // console.log(action.payload.cars, "HYDRATE");
      // if(action.payload.cars) {
        return {...state,  ...action.payload.cars};
      // }else {
      //   return state;
      // }
    }
  }
});

export const { setCars, setCount, setAll ,pageNext, pagePrev, setPage, setFilter, changeFilter, changeFilterMake }  = carsSlice.actions;

export default carsSlice.reducer;