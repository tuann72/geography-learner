import React, {useEffect, useState} from 'react'

function index() {

    const [countries, setCountries] = useState([])
    const [countryImg, setCountryImg] = useState([])

    useEffect(() =>{
      fetch("http://localhost:8080/api/flags")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
    }, []);


    return (
      <div>hello</div>
  );
}

export default index