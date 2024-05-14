import axios from 'axios';
import { useEffect, useState } from 'react';

const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
          try {
            const response = await axios.get(`https://swapi.dev/api/planets`);
            const slicedArray = response.data.results.slice(0, 2);
            console.log(slicedArray);
            setPlanets(slicedArray);
          } catch (err) {
            // setError(err);
          }
        };
    
        fetchPlanets();
      }, []);

  return (
    <div style={{display: 'flex',justifyContent: 'space-around'}}>
        {planets.map((planet, index) => (
            <div
                style={{width: '300px',height: '100px',border: '1px solid black'}}
                key={index}>
                    {planet.name}
            </div>
        ))}
    </div>
  );
};

export default Planets;