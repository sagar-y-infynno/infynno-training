import React, { useEffect, useState } from 'react';
import {FaRegImage} from 'react-icons/fa';
import axios from 'axios';

export default function Test() {

  
  const [innings, setInnings] = useState(['test']);

  useEffect(() => {
    (async () => {
    //   // const res = await axios.get();
    //   let url = 'https://cors-anywhere.herokuapp.com/https://cricket.sportmonks.com/api/v2.0/fixtures/3?api_token=NYF1FqiVZnU22X05JPoCKetWP5H3rmZV4kpnyVz5sHrFC3TQ1ZbwY3iXOuMn&include=localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman';
    //   const res = await axios.get('http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?');
    //   console.log(res);
    // axios.get('https://cors-anywhere.herokuapp.com/https://cricket.sportmonks.com/api/v2.0/fixtures/3?api_token=NYF1FqiVZnU22X05JPoCKetWP5H3rmZV4kpnyVz5sHrFC3TQ1ZbwY3iXOuMn&include=localteam,visitorteam,bowling.team,batting.team,runs.team,bowling.bowler,batting.batsman')
    
    // done working....
    const url = encodeURIComponent("https://cricket.sportmonks.com/api/v2.0/players/278?api_token=pCKbJYBnFQkyAqEEfEgQAGkFDCHYjeV7PwTpvC6qtCN9wa6mp3aJ512MJjYh&include=career,teams,currentteams");
    const { data } = await axios.get('https://api.allorigins.win/raw?url='+url);
    console.log("----------- matches ------------------");
    console.log(data.data.career.filter(career => career.type === "ODI"));
    console.log(data.data.career.filter(career => career.type === "ODI").reduce((career_data, career) => ({...career_data, 
      batting: { ...career_data.batting, matches: (career_data.batting.matches + career.batting.matches), 
      innings: (career_data.batting.innings + career.batting.innings), 
      hundreds: (career_data.batting.hundreds + career.batting.hundreds), 
      fifties: (career_data.batting.fifties + career.batting.fifties), 
      four_x: (career_data.batting.four_x + career.batting.four_x), 
      six_x: (career_data.batting.six_x + career.batting.six_x),
      balls_faced: (career_data.batting.six_x + career.batting.six_x),
      not_outs: (career_data.batting.six_x + career.batting.six_x)
    } }) ));
    // console.log(data.data.career.filter(career => career.type === "ODI").reduce((career_data, career) => ({...career_data, matches: career.batting.matches }) ));
    })();
    
  }, []);

  if(innings.length === 0) return (<p>Loading....</p>);

  return (
    <div style={{textAlign: 'left'}}>
      {/* <FaRegImage size={100} /> */}
      <p>...done</p>
      {/* <pre>{JSON.stringify(innings, null, 2)}</pre> */}
    </div>
  )
}
