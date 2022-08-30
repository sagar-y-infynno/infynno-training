import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ModelDialog from './ModelDialog';


export default function ListCard({car_data}) {
  let [isOpen, setIsOpen] = useState(true);

  const handleModel = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Link href="/details/1003" >
        <a>
          <div className="auto-card">
            <div className="card-container" >
              <div className="car-image-box">
                {car_data === "loading" ?
                  <div className=" h-[254px] animate-pulse w-[360px] bg-gray-500"></div>
                :
                  car_data.has_photos === "N" ?
                    <Image src="/images/imageplaceholder.png" layout='responsive' alt="cars" width={360} height={254} />
                  :
                    <Image src={car_data.photos[0]} layout='responsive' alt="cars" width={360} height={254} />
                }
              </div>
              <div className="car-details-box">
                <div className='card-details-top' >
                  {car_data === "loading" ? 
                    <>
                      <div className="w-full h-[32px] mb-[6px] animate-pulse bg-gray-500"></div>
                      <div className="w-full h-[16px] mb-[6px] animate-pulse bg-gray-500"></div>
                      <div className="w-full h-[16px] mb-[6px] animate-pulse bg-gray-500"></div>
                    </>
                    :
                    <>
                      <p className="card-car-name">{car_data.year} {car_data.make} {car_data.model}</p>
                      <p className="card-info-name">{car_data.dealership} • {car_data.milage}  Milage • {car_data.exterior_color}</p>
                      <p className="card-info-name">{car_data.city}, {car_data.state}</p>
                    </>
                  }
                </div>
                <div className='card-details-bottom' >
                  <div className="car-price-box">
                  {car_data === "loading" ? 
                    <div className="w-[200px] h-[38px] mb-[6px] animate-pulse bg-gray-500"></div>
                  : 
                    <p className="font-[600] text-[28px] leading-[38px] text-[#28293D]" >
                      {car_data.price.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits: 0})}
                    </p>
                  }

                    <Image src="/images/info.svg" height={16} width={16} alt='info' />
                  </div>
                  <button onClick={handleModel} className={`card-action-btn ${car_data === "loading" && "disabled"} `} disabled={car_data === "loading" ? true : false}>
                    <span>Invite dealer</span>
                    <Image src="/images/arrow.svg" alt="arrow" layout="fixed" width={15} height={24} />
                  </button>
                </div>
              </div>
            </div>
            {car_data === "loading" ?
              <div className="p-[16px_24px] bg-[#fff8e6] cursor-pointer">
                <div className="p-[16px_24px] w-full h-[44px] animate-pulse bg-gray-500"></div>
              </div>
            : 
              car_data.car_offers && 
              <div className="p-[16px_24px] bg-[#fff8e6] cursor-pointer">
                <div className="flex items-center">
                  <Image src="/images/green-star.svg" height="20px" width="15px" alt="Special Offers" />
                  <p className="ml-[4px] text-[12px] font-[600] leading-[20px] text-[#05A660] uppercase">Special Offers</p>
                </div>
                <div className='flex items-center gap-[16px]'>
                  {JSON.parse(car_data.car_offers).map((offer, i) => (
                    <p className="flex items-center gap-[6px]" key={i} >
                      <span className="h-[4px] w-[4px] rounded-[2px] bg-black mr-[4px] block"></span>
                      <span>{offer}</span>
                    </p>
                  ))}
                </div>
              </div>
            }
          </div>
        </a>
      </Link>
      <ModelDialog isOpen={isOpen} />
    </>
  )
}
