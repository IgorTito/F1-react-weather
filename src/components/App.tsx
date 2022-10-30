import * as React from "react";

import axios from 'axios';
import Button from "react-bootstrap/Button";

import '../styles/App.css';
import TwoDays from "./TwoDays";
import Now from "./Now";
import Week from "./Week";


function App(){
    const app_id : string = 'b9928f2b2a68cdfbabcd09eb619b9197';

    const [country, setCountryName] = React.useState('');
    const [week, setWeek] = React.useState([]);
    const [now, setNow] = React.useState([]);
    const [twoDays, setTwoDays] = React.useState([]);
    const [clicked,setClick] = React.useState(false);

    const CountryLocation = async () => {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=${app_id}`)
        const data :object = res.data
        const latitude :number = data[0].lat;
        const longitude :number= data[0].lon;
        await WeatherInfo (latitude,longitude);
    }

    const WeatherInfo = async (latitude,longitude) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${app_id}&units=metric`);
        const data = res.data;
        setWeek(data.daily);
        setTwoDays(data.hourly);
        setNow(data.current);
        setClick(true);
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h2>Прогноз погоды</h2>
                <div className="frame">
                    {!clicked ?
                        <>
                            <select className="form-select" aria-label="Default select example" value={country} onChange={e=>setCountryName(e.target.value)}>
                                <option>Выберите город</option>
                                <option>Volgograd</option>
                                <option>Paris</option>
                                <option>Moscow</option>
                                <option>Berlin</option>
                                <option>Tokyo</option>
                                <option>London</option>
                                <option>Prague</option>
                                <option>Rome</option>
                            </select>
                            <br/>
                            <Button variant="dark" onClick={CountryLocation}>Нажмите, чтобы узнать прогноз погоды</Button>
                        </>
                        :
                        <>
                            <Now name={country} data={now}/>
                            <h2>Следующие 2 дня</h2>
                            <div className="cell">
                                {twoDays.map((value,index) =>
                                    <TwoDays day={index} temp={value.temp} icon={value.weather[0].icon} key={value.dt}/>
                                )}
                            </div>
                            <h2>Прогноз на неделю</h2>
                            <div className="cell grid2">
                                {week.map((value,index) =>
                                    <Week day={index} temp={value.temp.day} icon={value.weather[0].icon} key={value.dt}/>
                                )}
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
export default App;