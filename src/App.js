
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const KEY = '5dbf2561478814f54e6a9cc7ba06ef3e';
  const [name, setName] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const getWeather = () => {
    if (!name) {
      setError('Please enter the name of the area or city where you live.');
      return;
    }

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${KEY}`)
      .then(({ data }) => {
        setWeather(data);
        setError(null);
      })
      .catch((error) => {
        setError('City not found. Please enter a valid city name.');
        setWeather({});
      });
  }

  return (
    <div className="App">
      <h1 className='weather'>The weather ⛅</h1>
      <input className='input' onChange={(e) => setName(e.target.value)} placeholder='Write the city' type="text" />
      <button className='button' onClick={getWeather}>To know</button>
      <div className="content">
        {error ? (
          <h3 className='message'>{error}</h3>
        ) : JSON.stringify(weather) !== '{}' ? (
          <center>
            <table border="1">
              <tr>
                <th>Country</th>
                <td>{weather.sys.country}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{weather.name}</td>
              </tr>
              <tr>
                <th>Temp</th>
                <td>{(weather.main.temp - 273.15).toFixed(0)}°C</td>
              </tr>
              <tr>
                <th>Wind speed</th>
                <td>{weather.wind.speed}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{weather.description}clear sky</td>
              </tr>
            </table>
          </center>
        ) : null}
      </div>
    </div>
  );
}

export default App;
