import React from 'react';
import ordinal from 'ordinal';

function ScoreHeader({ head_data }) {
  return (
    <div className="match-card-details pb-[8px] pt-[22px] rounded-[0px_0px_12px_12px]">
      <div className="w-full">
        <div className="flex justify-between w-full px-[20px]">
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-center items-center">
              <p className="text-[11px] leading-[1.27] tracking-[0.3px] rounded-[2px] bg-[#9d2a13] text-white p-[3px_5px]">
                {head_data.localteam.code}
              </p>
              <p className="text-[11px] leading-[1.27] tracking-[0.3px] m-[5px] text-[#787878]">
                {ordinal(head_data.runs[1].inning)} INN
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="font-bold text-black text-[28px] leading-[42px] tracking-[0.14px]">
                {head_data.runs[1].score +
                  "/" +
                  head_data.runs[1].wickets}
              </p>
              <p className="text-[12px] leading-[1.33] tracking-[0.4px] font-bold m-[5px] text-[#787878]">
                ({head_data.runs[1].overs})
              </p>
            </div>
          </div>
          <div className="flex relative justify-center items-center">
            <div className="bg-[#dcdcdc] w-[1px] h-[60px] "></div>
            <p className="text-[15px] absolute block leading-[24px] text-center text-[#99a0b3] bg-[#dcdcdc] h-[24px] w-[24px] rounded-full">
              V
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <div className="flex justify-center items-center">
              <p className="text-[11px] leading-[1.27] tracking-[0.3px] m-[5px] text-[#787878]">
                {ordinal(head_data.runs[1].inning)} INN
              </p>
              <p className="text-[11px] leading-[1.27] tracking-[0.3px] rounded-[2px] bg-[#9d2a13] text-white p-[3px_5px]">
                {head_data.visitorteam.code}
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-[12px] leading-[1.33] tracking-[0.4px] font-bold m-[5px] text-[#787878]">
                ({head_data.runs[0].overs})
              </p>
              <p className="font-bold text-black text-[28px] leading-[42px] tracking-[0.14px]">
                {head_data.runs[0].score +
                  "/" +
                  head_data.runs[0].wickets}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default React.memo(ScoreHeader);