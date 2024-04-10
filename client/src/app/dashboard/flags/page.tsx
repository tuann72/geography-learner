"use client";

import React, {useEffect, useState} from 'react'

export default function Page() {

    const [countries, setCountries] = useState([])
    const [countryImg, setCountryImg] = useState([])

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


    return (
      <div className="bg-sky-50 h-screen flex flex-col items-center">
        <div className="text-black text-3xl h-1/5 flex flex-col justify-end items-center py-10">
          Flag Game
        </div>
        <div className="text-black h-2/5  bg-yellow-200">
          Display
        </div>
        <div className="text-black h-2/5 flex flex-col items-center">
          <div className="flex flex-col items-center pb-4">
            <label>Enter the name of the country that matches the flag!</label>
            <input type="text" id="country_entry" placeholder="Country" className="bg-gray-50 border border-gray-300 w-full h-10 rounded-lg px-2"/>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Submit</button>
            <button className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Skip</button>
            <button className="text-l text-white bg-cyan-700 hover:bg-cyan-950 px-4 py-2 rounded-lg border border-gray-300">Home</button>
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
