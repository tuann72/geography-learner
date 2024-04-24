"use client";

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import GetRandomNum from '@/utils/randomNum'

interface shapeData{
  country: string;
  imageUrl: string;
}

export default function Page() {

    const router = useRouter();
    const [countries, setCountries] = useState<shapeData[]>([]);
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [index3, setIndex3] = useState(0);
    const [index4, setIndex4] = useState(0);
    const [index5, setIndex5] = useState(0);
    const [score, setScore] = useState(0);
    const [correction, setCorrection] = useState("");


    useEffect(() =>{
      fetch("http://localhost:8080/api/shapes")
      .then(response => response.json())
      .then(data => {
        const shapesArray : shapeData[] = Object.entries(data).map(([country, imageUrl]) => ({
          country, imageUrl: imageUrl as string
        }));
        setCountries(shapesArray);
      });
    }, []);

    function getShape(index: number){
      return countries[index]?.imageUrl
    }

    function getName(index: number){
      return countries[index]?.country
    }

    function addScore(result: boolean){
      if(result == true){
        setScore(score + 1)
        setCorrection("Correct!")
      }
      else{
        setCorrection("")
      }
      setIndex1(GetRandomNum(0, 233))
    }

    function skip(){
      setIndex1(GetRandomNum(0, 243))
      setCorrection("")
    }

    function setOptions(){
      setIndex1(GetRandomNum(0, 243));
      let correctIndex = index1;

      let wrongIndex1 = GetRandomNum(0,243);
      while(true){
        if(wrongIndex1 == correctIndex){
          wrongIndex1 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }
      let wrongIndex2 = GetRandomNum(0,243);
      while(true){
        if(wrongIndex2 == correctIndex || wrongIndex2 == wrongIndex1){
          wrongIndex2 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }
      let wrongIndex3 = GetRandomNum(0,243);
      while(true){
        if(wrongIndex3 == correctIndex || wrongIndex3 == wrongIndex2 || wrongIndex3 == wrongIndex1){
          wrongIndex3 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }
      let wrongIndex4 = GetRandomNum(0,243);
      while(true){
        if(wrongIndex4 == correctIndex || wrongIndex4 == wrongIndex3 || wrongIndex4 == wrongIndex2 || wrongIndex4 == wrongIndex1){
          wrongIndex4 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }

      setIndex2(wrongIndex1)
      setIndex3(wrongIndex2)
      setIndex4(wrongIndex3)
      setIndex5(wrongIndex4)

      console.log(index1)
      console.log(index2)
      console.log(index3)
      console.log(index4)
      console.log(index5)
    }

    console.log(countries.length)


    return (


      
      <div className="bg-sky-50 h-screen flex flex-col items-center">
        <div className="text-black h-1/5 flex flex-col justify-end items-center py-10">
          <h1 className="text-3xl">Shape Game</h1>
          <h2>Score: {score}</h2>
        </div>
        <div className="h-2/5">
          <img className="h-64 w-100" src={getShape(0)}/>
        </div>
        <div className="text-black h-2/5 flex flex-col items-center">
          <div className="flex flex-col items-center pb-4">
            <label>Enter the name of the country that matches the flag!</label>
            <p>{correction}</p>
            <div className="grid grid-cols-5 gap-3">
              <button className='text-l bg-slate-200 hover:bg- px-4 py-2 rounded-lg border border-black'>test</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => skip()} className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Skip</button>
            <button onClick={() => router.push("/")}className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Home</button>
          </div>
        </div>
        <div>
        <p>{getName(0)}</p>
       </div>
      </div>
      // <div>
      //   {countries.map(({country, imageUrl}, index) => (
      //     <div key={index}>
      //       <img src={imageUrl} alt={country}/>
      //       <p>{country}</p>
      //     </div>
      //   ))}
      // </div>

  );
}
