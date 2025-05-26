import React from 'react'
import { useState } from 'react'
function WeatherApp() {
    
   const [city, setCity] = useState('')
   const [result,setResult]=useState("")
    
   const changeHandler=(e)=>{
    setCity(e.target.value);
   }

   const submitHandler=async(e)=>{
    e.preventDefault();
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
    const data=await response.json()
    console.log(data.main.temp);
    const kelvin=data.main.temp;
    const celsius=kelvin-273.15;
    console.log(celsius);
    setResult("Temperature at "+city+" is "+Math.round(celsius)+"°C");
   }
  return (
    <div>
      <center>
        <div className="card">
            <div className="card-body">
                <div className="card-title">Weather App</div>
                <form onSubmit={submitHandler}>
                    <input type="text" name="city" value={city} onChange={changeHandler}/><br /><br />
                    <input type="submit" value="Get Temperature" />
                </form>
                <h1>{result}</h1>
            </div>
        </div>
      </center>
    </div>
  )
}

export default WeatherApp
