import { useRecoilState, useResetRecoilState, atom, selector, DefaultValue} from 'recoil';
import { tempFahrenheit, tempCelsius } from './atom-selector';

// useRecoilValue: return the value
// useSetRecoilState: set the new value
// useRecoilState: return both the above


function TempCel() {

  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const resetTemp = useResetRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      
      Temp Celsius: {tempC}
      <br />
      Temp Fahrenheit: {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
      <br />
      <button onClick={reset}>Reset</button>
      
    </div>
  );
}

export default TempCel;