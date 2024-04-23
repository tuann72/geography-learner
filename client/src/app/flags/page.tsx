"use client";

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import GetRandomNum from '@/utils/randomNum'
import checkEntry from '@/components/submission';

export default function Page() {

    const router = useRouter();
    const intialIndex = GetRandomNum(0, 233)
    const [countries, setCountries] = useState([])
    const [countryImg, setCountryImg] = useState([])
    const [index, setIndex] = useState(intialIndex)
    const [score, setScore] = useState(0)
    const [userInput, setUserInput] = useState("")
    const [correction, setCorrection] = useState("")


    useEffect(() =>{
      fetch("http://localhost:8080/api/flags")
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
        setCountryImg(data.countryImg);
        console.log(data.countries);
        // console.log(data.countryImg);
      });
    }, []);

    function addScore(result: boolean){
      if(result == true){
        setScore(score + 1)
        setCorrection("Correct!")
        setUserInput("")
      }
      else{
        setCorrection("Incorrect: The flag was from " + countries[index] + ".")
        setUserInput("")
      }
      setIndex(GetRandomNum(0, 233))
    }

    function skip(){
      setIndex(GetRandomNum(0, 233))
      setCorrection("")
      setUserInput("")
    }


    return (
      
      <div className="bg-sky-50 h-screen flex flex-col items-center">
        <div className="text-black h-1/5 flex flex-col justify-end items-center py-10">
          <h1 className="text-3xl">Flag Game</h1>
          <h2>Score: {score}</h2>
        </div>
        <div className="h-2/5">
          <img className="h-64 w-100" src={countryImg[index]}/>
        </div>
        <div className="text-black h-2/5 flex flex-col items-center">
          <div className="flex flex-col items-center pb-4">
            <label>Enter the name of the country that matches the flag!</label>
            {
              /* 
              The input element has two attributes: value and onChange
              value is set to userInput
              onChange is set to use handleChange
              handleChange is a function that takes an event as an argument
              The event is the input element that is being changed and the value is the value of the input element
              */
            }
            <p>{correction}</p>
            <input type="text" id="country_entry" placeholder="Country"  value={userInput} onChange={e => setUserInput(e.target.value)} className="bg-gray-50 border border-gray-300 w-full h-10 rounded-lg px-2"/>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* The onClick event creates a arrow function that calls setIndex
                setIndex uses useState to update the index state with a random number
                This updates any component that uses the index state.
            */}
            <button onClick={() => addScore(checkEntry(userInput, countries[index]))} className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Submit</button>
            <button onClick={() => skip()} className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Skip</button>
            <button onClick={() => router.push("/")}className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Home</button>
          </div>
        </div>
          {
            // countryImg.map((link, index)=>(
            //   <div key={index}>
            //     <img src={link}/>
            //     <div>{countries[index]}</div>
            //   </div>
            // ))
          }
      </div>
  );
}
