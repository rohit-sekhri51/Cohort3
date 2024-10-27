import {atom, selector, DefaultValue} from 'recoil';

export const tempFahrenheit = atom({
    key: 'tempFahrenheit',
    default: 32,
  });
  
  
 export const tempCelsius = selector({
    key: 'tempCelsius',
    get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
    set: ({set}, newValue) =>
      set(
        tempFahrenheit,
        newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
      ),
  });

// export default { tempFahrenheit, tempCelsius };