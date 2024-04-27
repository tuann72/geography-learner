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
    const [selectIndex, setSelectIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correction, setCorrection] = useState("");



    function getShape(index: number){
      return countries[index]?.imageUrl
    }

    function getName(index: number){
      return countries[index]?.country
    }

    function checkAnswer(index: number){
      if(index == selectIndex){
        setScore(score + 1)
        setCorrection("Correct!")
      }
      else{
        setCorrection("Incorrect. Answer is " + getName(selectIndex))
      }
      setOptions()
    }

    function skip(){
      setOptions()
      setCorrection("")
    }

    function setOptions(){
      setIndex1(GetRandomNum(0, 242));
      let Index = index1;

      let Index1 = GetRandomNum(0,242);
      while(true){
        if(Index1 == Index){
          Index1 = GetRandomNum(0, 242);
        }
        else{
          break;
        }
      }
      let Index2 = GetRandomNum(0,243);
      while(true){
        if(Index2 == Index || Index2 == Index1){
          Index2 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }
      let Index3 = GetRandomNum(0,243);
      while(true){
        if(Index3 == Index || Index3 == Index2 || Index3 == Index1){
          Index3 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }
      let Index4 = GetRandomNum(0,243);
      while(true){
        if(Index4 == Index || Index4 == Index3 || Index4 == Index2 || Index4 == Index1){
          Index4 = GetRandomNum(0, 243);
        }
        else{
          break;
        }
      }

      setIndex2(Index1)
      setIndex3(Index2)
      setIndex4(Index3)
      setIndex5(Index4)

      const randNum = GetRandomNum(0,4)

      if(randNum == 0){
        setSelectIndex(Index)
      }
      else if(randNum == 1){
        setSelectIndex(Index1)
      }
      else if(randNum == 2){
        setSelectIndex(Index2)
      }
      else if(randNum == 3){
        setSelectIndex(Index4)
      }
      else{
        setSelectIndex(Index4)
      }
    }

    useEffect(() =>{
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/shapes");
          const data = await response.json();
          const shapesArray: shapeData[] = Object.entries(data).map(([country, imageUrl]) => ({
            country,
            imageUrl: imageUrl as string
          }));
          setCountries(shapesArray);
          setOptions();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
      
    }, []);
    return (

      <div className="bg-sky-50 h-screen flex flex-col items-center">
        <div className="text-black h-1/5 flex flex-col justify-end items-center py-10">
          <h1 className="text-3xl">Shape Game</h1>
          <h2>Score: {score}</h2>
        </div>
        <div className="h-2/5">
          <img className="h-64 w-100" src={getShape(selectIndex)}/>
        </div>
        <div className="text-black h-2/5 flex flex-col items-center">
          <div className="flex flex-col items-center pb-4">
            <label>Enter the name of the country that matches the flag!</label>
            <p>{correction}</p>
            <div className="grid grid-cols-5 gap-3">
              <button onClick={() => checkAnswer(index1)} className='text-l bg-slate-200 hover:bg- px-4 py-2 overflow-hidden truncate rounded-lg border border-black'>{getName(index1)}</button>
              <button onClick={() => checkAnswer(index2)} className='text-l bg-slate-200 hover:bg- px-4 py-2 overflow-hidden truncate rounded-lg border border-black'>{getName(index2)}</button>
              <button onClick={() => checkAnswer(index3)} className='text-l bg-slate-200 hover:bg- px-4 py-2 overflow-hidden truncate rounded-lg border border-black'>{getName(index3)}</button>
              <button onClick={() => checkAnswer(index4)} className='text-l bg-slate-200 hover:bg- px-4 py-2 overflow-hiddenx truncate rounded-lg border border-black'>{getName(index4)}</button>
              <button onClick={() => checkAnswer(index5)} className='text-l bg-slate-200 hover:bg- px-4 py-2 overflow-hidden truncate rounded-lg border border-black'>{getName(index5)}</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={skip} className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Skip</button>
            <button onClick={() => router.push("/")}className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Home</button>
          </div>
        </div>
        <div>
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
