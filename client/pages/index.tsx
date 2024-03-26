import React, {useEffect, useState} from 'react'

function index() {

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
      <div>
          {
            countryImg.map((link, index)=>(
              <div key={index}>
                <img src={link}/>
                <div>{countries[index]}</div>
              </div>
            ))
          }
      </div>
  );
}

export default index