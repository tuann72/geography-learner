"use client";

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import GetRandomNum from '@/utils/randomNum'

export default function Page() {

    const router = useRouter();
    const intialIndex = GetRandomNum(0, 233)
    const [countries, setCountries] = useState([])
    const [index, setIndex] = useState(intialIndex)
    const [score, setScore] = useState(0)
    const [userInput, setUserInput] = useState("")
    const [correction, setCorrection] = useState("")


    useEffect(() =>{
      fetch("http://localhost:8080/api/shapes")
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        console.log(countries);
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
          <h1 className="text-3xl">Shape Game</h1>
          <h2>Score: {score}</h2>
        </div>
        <div className="h-2/5">
          <img className="h-64 w-100" src={""}/>
        </div>
        <div className="text-black h-2/5 flex flex-col items-center">
          <div className="flex flex-col items-center pb-4">
            <label>Enter the name of the country that matches the flag!</label>
            <p>{correction}</p>
            <div className="grid grid-cols-5 gap-3">
              <button className='text-l bg-rose-200 hover:bg-rose-400 px-4 py-2 rounded-lg border border-black'>test</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => skip()} className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Skip</button>
            <button onClick={() => router.push("/")}className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Home</button>
          </div>
        </div>
      </div>
  );
}
