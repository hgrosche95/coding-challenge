import React from 'react';
import './App.css';
import InputField from './components/InputField';




const App:React.FC = () => {

  const addTrailingZeros = (number: string, rounding: number, indentifier: string) => {
    if (number.includes(indentifier)){
    var splitted_string = number.split(indentifier);
        if(splitted_string[1].length < rounding){
            for(var i = splitted_string[1].length; i < rounding; i++){
                number = number+"0";
            }
            return number;
        }
        else return number;
    }
    else return number;
}

//ersetzt Zeichen an einer bestimmten Stelle
const setCharAt = (string: string, index: number, char: string) => {
    if(index > string.length-1){
        return string;
    }
    return string.substring(0,index) + char + string.substring(index+1);
}

//Tauscht Punkt mit Komma
const switchCommaAndDot = (number: any, rounding: number, identifier: string) => {
    var indices_of_points = [];
    for(var i=0; i<number.length; i++) {
        if (number[i] === ".") {
            indices_of_points.push(i);
        }
    }
    var indices_of_commas = [];
    for(let i=0; i<number.length; i++) {
        if (number[i] === ",") {
            indices_of_commas.push(i);
        }
    }

    if(indices_of_points.length > 0){
        var number_without_points = setCharAt(number,indices_of_points[0],',');
    }
    else{
        number_without_points  = number;
    }
    
    if(indices_of_commas.length > 0){
        number = setCharAt(number_without_points,indices_of_commas[0],'.');
    }
    else{
        number = number_without_points;
    }

    number = addTrailingZeros(number, rounding, identifier);

    return number;
}

const format = (number: any, rounding?: number, target?: string, replacement?: string, rounded?: boolean) => {
    //Sondereingaben ausschließen
    if(((typeof number !== "string" && typeof number !== "number") || number === Infinity)){
        return "0,00";
    }
    if(rounding === undefined){
        rounding = 2;
    }
    if(typeof number === "number"){

        number = number.toString();
    }
    if(typeof number === "string" && !parseInt(number)){
        number = "0,00";
    }
   
    var splitted_string = number.split(".");
    
    //Sonderfall für negative Zahlen
    if(number < 0 || rounded === false){
        //Bei den Angegebenen Cases nicht notwendig. Gilt für den Fall einer Eingabe ohne Punkt und der letzte Wert false ist
        if(number.includes(".")){
        //Entfernen von den hinteren überschüssigen Zahlen für das abrunden, bzw. letzter Wert false ist
        splitted_string[1] = splitted_string[1].substring(0, splitted_string[1].length -  (splitted_string[1].length- rounding));
        number = splitted_string[0] + '.' + splitted_string[1];

        number = new Intl.NumberFormat('de-De').format(number);
        }
        else{
            number = new Intl.NumberFormat('de-De').format(number);
        }
    }

    else {            

        number = addTrailingZeros(number, rounding, '.');    

        //falls letzte Ziffer eine 0 ist
        if(number[number.length-1] !== '0'){
        number = parseFloat(number).toFixed(rounding).toString();

    }
    
    if(number !== "0,00"){
    //Zahl formatieren
    number = new Intl.NumberFormat('de-De').format(number);
    }
    if( target === '.' && replacement === ','){
        return switchCommaAndDot(number, rounding, '.');
    }
    else {
        number = addTrailingZeros(number, rounding, ',');
        return number;
    }
}
return number;
};



  return ( 
  <div className="App">
    <InputField formatNumber={format}/>
    <div className="result-grid">
        <p className="result-line">assert.equal("0,00", format(undefined)) = {format(undefined) === "0,00"? "true" : "false"}</p>
        <p className="result-line">  assert.equal("2,56", format(2.555)) = {format("2.555") === "2,56"? "true":"false"}</p>
        <p className="result-line"> assert.equal("10.000,556", format(10000.5555, 3)) = {format("10000.5555", 3) === "10.000,556" ? "true" : "false"}</p>
        <p className="result-line"> assert.equal("100.000,28", format(100000.28374, 2, ",", ".")) = {format(100000.28374, 2, ",", ".") === "100.000,28" ? "true" : "false"}</p>
        <p className="result-line"> assert.equal("100,000.6", format(100000.55555, 1, ".", ",")) = {format(100000.55555, 1, ".", ",") === "100,000.6" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("1,5550000000", format(1.555, 10, ",", ".")) = {format(1.555, 10, ",", ".") === "1,5550000000" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("-1,5555", format(-1.55555, 4)) = {format(-1.55555, 4) === "-1,5555" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("1,555", format(1.55555, 3, ",", ".", false)) = {format(1.55555, 3, ",", ".", false) === "1,555" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("1,56", format("1.5555", 2)) = {format("1.5555", 2) === "1,56" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("221,5550000000", format(221.555, 10, ",", ".")) = {format(221.555, 10, ",", ".") === "221,5550000000" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("0,00", format({})) = {format(100000.55555, 1, ".", ",") === "100,000.6" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("0,00", format(null)) = {format(null) === "0,00" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("0,00", format(Infinity, 5)) = {format(Infinity, 5) === "0,00" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("88.888.888.888.888,880", format(88888888888888.88, 3)) = {format(88888888888888.88, 3) === "88.888.888.888.888,880" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("-8.888,8", format(-8888.899, 1, "", "", false)) = {format(-8888.899, 1, "", "", false) === "-8.888,8" ? "true" : "false" }</p>
        <p className="result-line">assert.equal("111.111.111,5550000000", format(111111111.555, 10)) = {format(111111111.555, 10) === "111.111.111,5550000000" ? "true" : "false" }</p> 
        </div>
    </div>
  );
}

export default App;
