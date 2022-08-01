import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ordinal from 'ordinal';
// import roundArrow from '../assets/svgs/round-arrow.svg';
import ScoreAccordion from '../components/ScoreAccordion';
import ScoreHeader from '../components/ScoreHeader';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores, selectHeaderData, selectScore, clearBoth } from '../reducers/scoreSlice';
import loader from '../assets/svgs/loader.svg';

export default function ScoreBoard() {
  const [openTab, setOpenTab] = useState(4);
  const { stage_id, fix_id } = useParams();
  let match_data = useSelector(selectScore);
  let head_data = useSelector(selectHeaderData);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchScores(stage_id, fix_id));
    return(() => {
      dispatch(clearBoth);
    });
  }, [fix_id, stage_id]);

  if(match_data.length === 0 || head_data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="h-full w-full max-w-[150px]">
          <img className="h-full w-full" src={loader} alt="loader" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-[672px] w-full px-5 py-[20px] mx-auto">
        {/* header */}
          <ScoreHeader head_data={head_data} />
        {/* header */}
        <div className="">
          <p className="text-[14px] text-theme-main font-bold mt-[10px] text-center tracking-[0.28px] leading-[20px] mb-[15px]">
            {match_data.note}
          </p>
        </div>
        <div className="flex flex-wrap ">
          <div className="w-full">
            <ul className="flex mb-0 list-none flex-wrap mt-3 flex-row border-y border-y-light-border" >
              <li className="-mb-px relative last:mr-0 flex-auto text-center cursor-pointer">
                <p 
                  className={
                    "text-[14px] px-5 py-3  block leading-normal " +
                    (openTab === 1
                      ? "after:content-[''] after:h-[4px] after:rounded-[3px_3px_0px_0px] after:w-full after:bg-theme-secondary after:absolute after:left-0 after:bottom-0"
                      : "text-[#66718c]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                >
                  Fantasy
                </p>
              </li>
              <li className="-mb-px relative last:mr-0 flex-auto text-center cursor-pointer">
                <p
                  className={
                    "text-[14px] px-5 py-3  block leading-normal " +
                    (openTab === 2
                      ? "after:content-[''] after:h-[4px] after:rounded-[3px_3px_0px_0px] after:w-full after:bg-theme-secondary after:absolute after:left-0 after:bottom-0"
                      : "text-[#66718c]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                >
                  Info
                </p>
              </li>
              <li className="-mb-px relative last:mr-0 flex-auto text-center cursor-pointer">
                <p
                  className={
                    "text-[14px] px-5 py-3  block leading-normal " +
                    (openTab === 3
                      ? "after:content-[''] after:h-[4px] after:rounded-[3px_3px_0px_0px] after:w-full after:bg-theme-secondary after:absolute after:left-0 after:bottom-0"
                      : "text-[#66718c]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                >
                  Live
                </p>
              </li>
              <li className="-mb-px relative last:mr-0 flex-auto text-center cursor-pointer">
                <p
                  className={
                    "text-[14px] px-5 py-3  block leading-normal " +
                    (openTab === 4
                      ? "after:content-[''] after:h-[4px] after:rounded-[3px_3px_0px_0px] after:w-full after:bg-theme-secondary after:absolute after:left-0 after:bottom-0"
                      : "text-[#66718c]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                >
                  Scorecard
                </p>
              </li>
              <li className="-mb-px relative last:mr-0 flex-auto text-center cursor-pointer">
                <p
                  className={
                    "text-[14px] px-5 py-3  block leading-normal " +
                    (openTab === 5
                      ? "after:content-[''] after:h-[4px] after:rounded-[3px_3px_0px_0px] after:w-full after:bg-theme-secondary after:absolute after:left-0 after:bottom-0"
                      : "text-[#66718c]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                >
                  Squad
                </p>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
              <div className="p-0 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} >
                    <p>test</p>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} >
                    <p>temp</p>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} >
                    <p>temp</p>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} >
                    {/* ----- */}
                    <div className="accordion-container" >
                      {match_data?.map((match, id) => (
                        <ScoreAccordion key={id} match={match} fix_id={fix_id} />
                      ))}
                    </div> 
                    {/* ----- */}
                  </div>
                  <div className={openTab === 5 ? "block" : "hidden"} >
                    <p>temp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
