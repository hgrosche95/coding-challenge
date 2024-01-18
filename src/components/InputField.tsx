import React, { FC, useState } from 'react'

interface Props {
  formatNumber: (number: any, rounding?: number, target?: string, replacement?: string, rounded?: boolean) => string;
}


const InputField: FC<Props> = ({formatNumber}) => {



  const [number, setNumber] = useState<string>();
  const [rounding, setRounding] = useState<number>();
  const [target, setTarget] = useState<string>();
  const [replacement, setReplacement] = useState<string>();
  const [rounded, setRounded] = useState<boolean>(true);
  const [result, setResult] = useState<string>("0,00");

  const changeIfRounded = () => {
    setRounded(!rounded);

  }


  return  <div>
            <div className='input-field-grid'>
              <label>
                Zu formatierende Zahl
                <input type="input" placeholder="0.00" className="first-input input-field" value={number} onChange={(e) => setNumber(e.target.value)}/>
              </label>
              <label>
                Anzahl der Nachkommastellen
                <input type="input" placeholder="2" className="input-field" value={rounding} onChange={(e) => setRounding(Number(e.target.value))}/>
              </label>
              <label>
                Ersetze
                <select className="input-field selection" value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value=""></option>
                  <option value=",">","</option>
                  <option value=".">"."</option>
                </select>
              </label>
              <label>
                Durch
                <select className="input-field" value={replacement} onChange={(e) => setReplacement(e.target.value)}>
                  <option value=""></option>
                  <option value=",">","</option>
                  <option value=".">"."</option>
                </select>
              </label>
              <label>
                <input className="checkbox"
                          type="checkbox"
                          checked={rounded} 
                          onChange={changeIfRounded}
                        />
                        Zahl aufrunden
              </label>
            </div>
            <button className="input-submit" onClick={() => setResult(formatNumber(number, rounding, target, replacement, rounded))}>Format Number</button>
            <p className='result'>Ergebnis: {result}</p>  
          </div>
};

export default InputField;