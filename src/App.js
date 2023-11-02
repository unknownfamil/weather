
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
      setError('Сураныч, сиз жашаган аймактын же шаардын атын киргизиңиз.');
      return;
    }

    axios(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${KEY}`)
      .then(({ data }) => {
        setWeather(data);
        setError(null);
      })
      .catch((error) => {
        setError('Шаар табылган жок. Жарактуу шаардын атын киргизиңиз.');
        setWeather({});
      });
  }

  return (
    <div className="App">
      <h1 className='weather'>Аба-ырайы ⛅</h1>
      <input className='input' onChange={(e) => setName(e.target.value)} placeholder='Издөө' type="text" />
      <button className='button' onClick={getWeather}>Билүү</button>
      <div className="content">
        {error ? (
          <h3 className='message'>{error}</h3>
        ) : JSON.stringify(weather) !== '{}' ? (
          <center>
            <table border="1">
              <tr>
                <th>Өлкө</th>
                <td>{weather.sys.country}</td>
              </tr>
              <tr>
                <th>Аты</th>
                <td>{weather.name}</td>
              </tr>
              <tr>
                <th>Температура</th>
                <td>{(weather.main.temp - 273.15).toFixed(0)}°C</td>
              </tr>
              <tr>
                <th>Шамалдын ылдамдыгы</th>
                <td>{weather.wind.speed}</td>
              </tr>
              <tr>
                <th>Сүрөттөмө</th>
                <td>{weather.description}Ачык асман</td>
              </tr>
            </table>
          </center>
        ) : null}
      </div>
    </div>
  );
}

export default App;
