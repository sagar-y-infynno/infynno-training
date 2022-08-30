import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import MakeSelect from '../components/MakeSelect';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FilterDropBox from './FilterDropBox';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, changePage, changeFilter } from '../reducers/carsSlice';
import ListCard from './ListCard';

export default function Main() {  
  const dispatch = useDispatch();
  const { cars } = useSelector(state => state);
  const { filter } = useSelector(state => state.cars);
  const [showMoreFlag, setShowMore] = useState([]);

  const PaginationHandler = (event) => {
    dispatch(changePage({...cars, page: (event.selected + 1), exclude: ["page"]}));
    dispatch(setPage(event.selected + 1));
  }

  const handleShowMore = (target) => {
    let show_more = [];
    if(showMoreFlag.includes(target)) {
      show_more.splice(show_more.indexOf(target), 1);
    }else {
      show_more.push(target);
    }
    setShowMore(show_more);
  }

  const handleCarType = (e) => {
    let change = {...cars.selected_filter, 
      car_type: cars.selected_filter.car_type.split(",").includes(e.target.value) ? 
        cars.selected_filter.car_type.split(",").filter(b_type => b_type !== e.target.value).join(',') :
        [...cars.selected_filter.car_type.split(","), e.target.value].join(",")
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["car_type"]}));
    dispatch(changeFilter(change));
  }

  const handleZipChange = (e) => {
    dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, zip: e.target.value }}));
    dispatch(changeFilter({...cars.selected_filter, zip: e.target.value}));
  }

  const handleMilesChange = (v) => {
    dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, radius: v }}));
    dispatch(changeFilter({...cars.selected_filter, radius: v}));
  }

  const handleFilterModelChange = (e) => {
    let change = {...cars.selected_filter, 
      model: cars.selected_filter.model.includes(e.target.value) ? 
        cars.selected_filter.model.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.model, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["model"]}));
    dispatch(changeFilter(change));
  }

  const handlePriceChange = (v) => {
    dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, price_from: v[0] }}));
    dispatch(changeFilter({...cars.selected_filter, price_to : v[1], price_from: v[0]}))
  }

  const handleYearChange = (v) => {
    dispatch(changePage({...cars, selected_filter : {...cars.selected_filter, year: v.join(",") }}));
    dispatch(changeFilter({...cars.selected_filter, year: v.join(",")}))
  }

  const handleBodyTypeChange = (e) => { 
    let change = {...cars.selected_filter, 
      body_type: cars.selected_filter.body_type.includes(e.target.value) ? 
        cars.selected_filter.body_type.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.body_type, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["body_type"]}));
    dispatch(changeFilter(change));
  }

  const handleFilterExteriorColorChange = (e) => {
    let change = {...cars.selected_filter, 
      exterior_color: cars.selected_filter.exterior_color.includes(e.target.value) ? 
        cars.selected_filter.exterior_color.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.exterior_color, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["exterior_color"]}));
    dispatch(changeFilter(change));
  }

  const handleFilterInteriorColorChange = (e) => {
    let change = {...cars.selected_filter, 
      interior_color: cars.selected_filter.interior_color.includes(e.target.value) ? 
        cars.selected_filter.interior_color.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.interior_color, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["interior_color"]}));
    dispatch(changeFilter(change));
  }

  const handleFilterTransmissionColorChange = (e) => {
    let change = {...cars.selected_filter, 
      transmission: cars.selected_filter.transmission.includes(e.target.value) ? 
        cars.selected_filter.transmission.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.transmission, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["transmission"]}));
    dispatch(changeFilter(change));
  }

  const handleFilterDriveTrainColorChange = (e) => {
    let change = {...cars.selected_filter, 
      drivetrain: cars.selected_filter.drivetrain.includes(e.target.value) ? 
        cars.selected_filter.drivetrain.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.drivetrain, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["drivetrain"]}));
    dispatch(changeFilter(change));
  }

  const handleFilterFuelTypeColorChange = (e) => {
    let change = {...cars.selected_filter, 
      fuel_type: cars.selected_filter.fuel_type.includes(e.target.value) ? 
        cars.selected_filter.fuel_type.filter(b_type => b_type !== e.target.value):
        [...cars.selected_filter.fuel_type, e.target.value]
    };
    dispatch(changePage({...cars, selected_filter : change, exclude: ["fuel_type"]}));
    dispatch(changeFilter(change));
  }

  // return null;

  return (
    <div className="main-page main-container">

      <div className="page-header">
        <span className='page-subtitle' >Used cars for sale</span>
        <p className='page-title' >
          Showing {cars.count.toLocaleString('en-US')} cars
        </p>
      </div>

      <div className="page-main" >
        <div className="filter-list-aside" >
          <div className="filter-block" >
            <div className="filter-block-head" >
              <p className="filter-block-title" >Filter by</p>
            </div>
            <div className="filter-options-container">
              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Car type</p>
                </div>
                <div className="filter-option-box-main">
                  <div className="chkbox-wrapper">
                    <div className="chkbox-field">
                      <input className='filter-checkbox' value="New Car" id="new_chk" type="checkbox" 
                        checked={cars.selected_filter.car_type.indexOf("New Car") !== -1} 
                        onChange={handleCarType} 
                        />
                      <label htmlFor="new_chk" >New</label>
                    </div>

                    <div className="chkbox-field">
                      <input id="used_chk" type="checkbox" className='filter-checkbox' value="Used Car"
                        checked={cars.selected_filter.car_type.indexOf("Used Car") !== -1} 
                        onChange={handleCarType} 
                      />
                      <label htmlFor="used_chk" >Used</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-option-box no-border">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Your ZIP</p>
                </div>
                <div className="filter-option-box-main zip-text">
                  <input type="text" value={cars.selected_filter.zip} onChange={handleZipChange} className="filter-zip-text" />
                  <Image className="zip-arrow" src="/images/arrow-orange.svg" alt="zip" height={20} width={15} />
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Search within</p>
                  <span>{cars.selected_filter.radius} miles</span>
                </div>
                <div className="filter-option-box-main">
                  <Slider
                    min={20}
                    max={500}

                    handleStyle={{
                      height: "20px",
                      width: "20px",
                      background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                      border: "2px solid #FFFFFF",
                      boxShadow: "0px 3px 7px -1px rgba(254, 110, 6, 0.46)",
                      borderRadius: "20px",
                      marginTop: "-7px",
                      opacity: "1" 
                    }}

                    trackStyle={{
                      background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                      height: "6px" 
                    }}

                    railStyle={{
                      background: "#EBEBF0",
                      height: "6px" 
                    }}

                    value={cars.selected_filter.radius}
                    onChange={handleMilesChange}
                    placement='top'
                    overlay={(val) => `${val} %`}
                  />
                  <div className="slider-label">
                    <span>20 miles</span>
                    <span>500 miles</span>
                  </div>
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Make</p>
                </div>
                <div className="filter-option-box-main">
                  <MakeSelect />
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Model</p>
                </div>
                <div className="filter-option-box-main">
                  <div className="chkbox-wrapper model-chks-wrap">
                    {filter.model && Object.keys(filter.model).splice(0, 5).map((m) => (
                      <div className="chkbox-field" key={m}>
                        <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                          checked={cars.selected_filter.model.includes(m)}
                          onChange={handleFilterModelChange}
                        />
                        <label htmlFor={`${m}_chk`} >{m} ({filter.model[m]})</label>
                      </div>
                    ))}
                    {filter.model && showMoreFlag.includes("model") && Object.keys(filter.model).splice(5).map((m) => (
                      <div className="chkbox-field" key={m}>
                        <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                          checked={cars.selected_filter.model.includes(m)}
                          onChange={handleFilterModelChange}
                        />
                        <label htmlFor={`${m}_chk`} >{m} ({filter.model[m]})</label>
                      </div>
                    ))}
                    {Object.keys(filter.model).length > 5 &&
                      <p className="show-more-link" onClick={() => handleShowMore("model") } >
                        <span>{ showMoreFlag.includes("model") ? "SHOW LESS" : "SHOW MORE" }</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`${showMoreFlag.includes("model") && "rotate-180" }`} xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                        </svg>
                      </p>
                    }
                  </div>
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Body type</p>
                </div>
                <div className="filter-option-box-main">
                <div className="chkbox-wrapper model-chks-wrap">
                    {filter.body_type && Object.keys(filter.body_type).splice(0, 5).map((m) => (
                      <div className="chkbox-field" key={m}>
                        <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                          checked={cars.selected_filter.body_type.includes(m)}
                          onChange={handleBodyTypeChange}
                        />
                        <label htmlFor={`${m}_chk`} >{m} ({filter.body_type[m]})</label>
                      </div>
                    ))}
                    {filter.body_type && showMoreFlag.includes("body_type") && Object.keys(filter.body_type).splice(5).map((m) => (
                      <div className="chkbox-field" key={m}>
                        <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                        />
                        <label htmlFor={`${m}_chk`} >{m} ({filter.body_type[m]})</label>
                      </div>
                    ))}
                    {Object.keys(filter.body_type).length > 5 &&
                      <p className="show-more-link" onClick={() => handleShowMore("body_type") } >
                        <span>{ showMoreFlag.includes("body_type") ? "SHOW LESS" : "SHOW MORE" }</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                        </svg>
                      </p>
                    }
                  </div>
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Price</p>
                  <span>{cars.selected_filter.price_from.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits: 0})} - {cars.selected_filter.price_to.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits: 0})}</span>
                </div>
                <div className="filter-option-box-main">
                  <Slider
                      range
                      min={0}
                      max={100000}
                      handleStyle={{
                        height: "20px",
                        width: "20px",
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0px 3px 7px -1px rgba(254, 110, 6, 0.46)",
                        borderRadius: "20px",
                        marginTop: "-7px",
                        opacity: "1"
                      }}

                      trackStyle={{
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        height: "6px"
                      }}

                      value={[cars.selected_filter.price_from, cars.selected_filter.price_to]}
                      onChange={handlePriceChange}

                      railStyle={{
                        background: "#EBEBF0",
                        height: "6px"
                      }}
                      
                    />
                  <div className="slider-label">
                    <span>$0</span>
                    <span>$100,000</span>
                  </div>
                </div>
              </div>

              <div className="filter-option-box">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Make year</p>
                  <span>{cars.selected_filter.year.split(',')[0]} - {cars.selected_filter.year.split(',')[1]}</span>
                </div>
                <div className="filter-option-box-main">
                <Slider
                      range
                      min={1990}
                      max={2021}
                      handleStyle={{
                        height: "20px",
                        width: "20px",
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0px 3px 7px -1px rgba(254, 110, 6, 0.46)",
                        borderRadius: "20px",
                        marginTop: "-7px",
                        opacity: "1"
                      }}

                      trackStyle={{
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        height: "6px"
                      }}

                      value={cars.selected_filter.year.split(',')}
                      onChange={handleYearChange}

                      railStyle={{
                        background: "#EBEBF0",
                        height: "6px"
                      }}
                      
                    />
                  <div className="slider-label">
                    <span>1990</span>
                    <span>2021</span>
                  </div>
                </div>
              </div>

              <div className="filter-option-box no-border">
                <div className="filter-option-box-head">
                  <p className="filter-option-title">Mileage</p>
                  <span>Any</span>
                </div>
                <div className="filter-option-box-main">
                <Slider
                      min={0}
                      max={500}
                      handleStyle={{
                        height: "20px",
                        width: "20px",
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0px 3px 7px -1px rgba(254, 110, 6, 0.46)",
                        borderRadius: "20px",
                        marginTop: "-7px",
                        opacity: "1"
                      }}

                      trackStyle={{
                        background: "linear-gradient(147.14deg, #FF8800 6.95%, #E63535 93.05%)",
                        height: "6px"
                      }}
                      railStyle={{
                        background: "#EBEBF0",
                        height: "6px"
                      }}
                      disabled
                  />
                  <div className="slider-label">
                    <span>0</span>
                    <span>Any</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FilterDropBox title="Style" >
            <div className="chk-options-group">
              <div className="options-group-title" >
                <p>Exterior color</p>
              </div>
              {filter.exterior_color && Object.keys(filter.exterior_color).splice(0, 5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.exterior_color.includes(m)}
                    onChange={handleFilterExteriorColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.exterior_color[m]})</label>
                </div>
              ))}
              {filter.exterior_color && showMoreFlag.includes("exterior_color") && Object.keys(filter.exterior_color).splice(5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.exterior_color.includes(m)}
                    onChange={handleFilterExteriorColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.exterior_color[m]})</label>
                </div>
              ))}
              {Object.keys(filter.exterior_color).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore("exterior_color")} >
                  <span>{ showMoreFlag.includes("exterior_color") ? "SHOW LESS" : "SHOW MORE" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
            </div>

            <div className="chk-options-group">
              <div className="options-group-title" >
                <p>Interior color</p>
              </div>
              {filter.interior_color && Object.keys(filter.interior_color).splice(0, 5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.interior_color.includes(m)}
                    onChange={handleFilterInteriorColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.interior_color[m]})</label>
                </div>
              ))}
              {filter.interior_color && showMoreFlag.includes("interior_color") && Object.keys(filter.interior_color).splice(5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.interior_color.includes(m)}
                    onChange={handleFilterInteriorColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.interior_color[m]})</label>
                </div>
              ))}
              {Object.keys(filter.interior_color).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore("interior_color")} >
                  <span>{ showMoreFlag.includes("interior_color") ? "SHOW LESS" : "SHOW MORE" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
            </div>
          </FilterDropBox>

          <FilterDropBox title="Performance">
            <div className="chk-options-group">
              <div className="options-group-title" >
                <p>Transmission</p>
              </div>
              {filter.transmission && Object.keys(filter.transmission).splice(0, 5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.transmission.includes(m)}
                    onChange={handleFilterTransmissionColorChange}
                    data-target="transmission"
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.transmission[m]})</label>
                </div>
              ))}
              {filter.transmission && showMoreFlag.includes("transmission") && Object.keys(filter.transmission).splice(5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.transmission.includes(m)}
                    onChange={handleFilterTransmissionColorChange}
                    data-target="transmission"
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.transmission[m]})</label>
                </div>
              ))}
              {Object.keys(filter.transmission).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore("transmission")} >
                  <span>{ showMoreFlag.includes("transmission") ? "SHOW LESS" : "SHOW MORE" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
            </div>

            <div className="chk-options-group">
              <div className="options-group-title" >
                <p>Drive Train</p>
              </div>
              {filter.drivetrain && Object.keys(filter.drivetrain).splice(0, 5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.drivetrain.includes(m)}
                    onChange={handleFilterDriveTrainColorChange} />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.drivetrain[m]})</label>
                </div>
              ))}
              {filter.drivetrain && showMoreFlag.includes("drivetrain") && Object.keys(filter.drivetrain).splice(5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.drivetrain.includes(m)}
                    onChange={handleFilterDriveTrainColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.drivetrain[m]})</label>
                </div>
              ))}
              {Object.keys(filter.drivetrain).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore("drivetrain")} >
                  <span>{ showMoreFlag.includes("drivetrain") ? "SHOW LESS" : "SHOW MORE" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
            </div>

            <div className="chk-options-group">
              <div className="options-group-title" >
                <p>Fuel Type</p>
              </div>
              {filter.fuel_type && Object.keys(filter.fuel_type).splice(0, 5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                    checked={cars.selected_filter.fuel_type.includes(m)}
                    onChange={handleFilterFuelTypeColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.fuel_type[m]})</label>
                </div>
              ))}
              {filter.fuel_type && showMoreFlag.includes("fuel_type") && Object.keys(filter.fuel_type).splice(5).map((m) => (
                <div className="chkbox-field" key={m}>
                  <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m} 
                    checked={cars.selected_filter.fuel_type.includes(m)}
                    onChange={handleFilterFuelTypeColorChange}
                  />
                  <label htmlFor={`${m}_chk`} >{m} ({filter.fuel_type[m]})</label>
                </div>
              ))}
              {Object.keys(filter.fuel_type).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore("fuel_type")} >
                  <span>{ showMoreFlag.includes("fuel_type") ? "SHOW LESS" : "SHOW MORE" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
            </div>
          </FilterDropBox>

          <FilterDropBox title="Features">
            {filter?.features && Object.keys(filter.features).map(feature => (
              <div className="chk-options-group" key={feature}>
                <div className="options-group-title" >
                  <p>{feature}</p>
                </div>
                {Object.keys(filter.features[feature]).splice(0, 5).map((m) => (
                  <div className="chkbox-field" key={m}>
                    <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                      checked={cars.selected_filter.features[feature].includes(m)}
                      onChange={(e) => {
                        let change = {...cars.selected_filter, 
                          features: { ...cars.selected_filter.features , [feature]: cars.selected_filter.features[feature].includes(e.target.value) ?
                            cars.selected_filter.features[feature].filter(b_type => b_type !== e.target.value) :
                            [...cars.selected_filter.features[feature], e.target.value]}
                        };
                        dispatch(changePage({...cars, selected_filter : change, exclude: "feature"}));
                        dispatch(changeFilter(change));
                      }}
                    />
                    <label htmlFor={`${m}_chk`} >{m} ({filter.features[feature][m]})</label>
                  </div>
                ))}
                {showMoreFlag.includes(`features[${feature}]`) && Object.keys(filter.features[feature]).splice(5).map((m) => (
                  <div className="chkbox-field" key={m}>
                    <input id={`${m}_chk`} type="checkbox" className='filter-checkbox' value={m}
                      checked={cars.selected_filter.features[feature].includes(m)}
                      onChange={(e) => {
                        let change = {...cars.selected_filter, 
                          features: { ...cars.selected_filter.features , [feature]: cars.selected_filter.features[feature].includes(e.target.value) ?
                            cars.selected_filter.features[feature].filter(b_type => b_type !== e.target.value) :
                            [...cars.selected_filter.features[feature], e.target.value]}
                        };
                        dispatch(changePage({...cars, selected_filter : change, exclude: "feature"}));
                        dispatch(changeFilter(change));
                      }}
                    />
                    <label htmlFor={`${m}_chk`} >{m} ({filter.features[feature][m]})</label>
                  </div>
                ))}
                {Object.keys(filter.features[feature]).length > 5 &&
                <p className="show-more-link" onClick={() => handleShowMore(`features[${feature}]`)} >
                  <span>{ showMoreFlag.includes(`features[${feature}]`) ? "Show less" : "Show more" }</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.58782 0.745492C0.912214 0.421099 1.43807 0.420812 1.76282 0.744852L4.65262 3.62835C4.84459 3.81991 5.15541 3.81991 5.34738 3.62835L8.23718 0.744853C8.56193 0.420813 9.08779 0.421099 9.41218 0.745492C9.73682 1.07014 9.73682 1.59649 9.41218 1.92113L5.83333 5.49998C5.3731 5.96022 4.6269 5.96022 4.16667 5.49998L0.58782 1.92113C0.263176 1.59649 0.263176 1.07014 0.58782 0.745492Z" fill="#FF8800"/>
                  </svg>
                </p>
              }
              </div>
            ))}
          </FilterDropBox>

          <FilterDropBox title="Rating">
            <div className="star-chk-wrap">
              <div className="chkbox-field">
                <input id="star_5" type="checkbox" className='filter-checkbox' value="new"/>
                <label htmlFor="star_5" >
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  <span>only</span>
                </label>
              </div>
              <div className="chkbox-field">
                <input id="star_4" type="checkbox" className='filter-checkbox' value="new"/>
                <label htmlFor="star_4" >
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  <span>and above</span>
                </label>
              </div>
              <div className="chkbox-field">
                <input id="star_3" type="checkbox" className='filter-checkbox' value="new"/>
                <label htmlFor="star_3" >
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  <span>and above</span>
                </label>
              </div>
              <div className="chkbox-field">
                <input id="star_2" type="checkbox" className='filter-checkbox' value="new"/>
                <label htmlFor="star_2" >
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  <span>and above</span>
                </label>
              </div>
              <div className="chkbox-field">
                <input id="star_1" type="checkbox" className='filter-checkbox' value="new"/>
                <label htmlFor="star_1" >
                  {<Image src="/images/star.svg" alt="star" height={18} width={20} />}
                  <span>and above</span>
                </label>
              </div>
            </div>
          </FilterDropBox>
          
          <FilterDropBox title="Contactless service">
          </FilterDropBox>
          
        </div>

        <div className="card-list-block">
          <div className="card-list-wrap">

          {
            cars.isLoading ? 
              ['','','','','','','','','','','','','','','','','','','',''].map((k, i) => (<ListCard key={i} car_data="loading" />) )
            :
            cars.data.length > 0 ?
              cars?.data?.map((car) => <ListCard car_data={car} key={car.car_id} /> )
            :
              <p className="w-full text-center text-[32px]">No cars found to match your search</p>
          }

          </div>
          <div className="pagination-block">
            <ReactPaginate
              className='pagination-box'
              breakLabel="..."
              nextLabel=">"
              nextClassName={`pagination-btn page-nav page-next `}
              previousClassName='pagination-btn page-nav page-prev'
              pageClassName='pagination-btn page-num'
              activeClassName='pagination-btn page-num page-active'
              breakClassName='pagination-btn'
              onPageChange={PaginationHandler}
              pageRangeDisplayed={5}
              forcePage={cars.page - 1}
              pageCount={Math.ceil(cars.count / 20)}
              previousLabel="<"
              marginPagesDisplayed={1}
              renderOnZeroPageCount={null}
            />
          </div>
          
          <div className="why-autodigg-block">
            <p className='why-title' >Why Autodigg?</p>
            <span className='why-content' >Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</span>
          </div>
        </div>
      </div>

    </div>
  )
}