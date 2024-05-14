import axios from 'axios';
import { useEffect, useState } from 'react';

const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPlanets = async () => {
          try {
            const response = await axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`);
            setPlanets(response.data.results);
          } catch (err) {
            // setError(err);
          }
        };
    
        fetchPlanets();
      }, [currentPage]);

      const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
      };
    
      const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
      };

  return (
    <div>
      <div style={{display: 'grid',gridTemplateColumns: 'repeat(5, 1fr)',gridGap: '40px'}}>
        {planets.map((planet, index) => (
            <div
                style={{width: '100px',height: '100px',border: '1px solid black'}}
                key={index}>
                    {planet.name}
            </div>
        ))}
      </div>
      <div style={{marginTop: '20px',display: 'flex',justifyContent: 'center'}}>
          <button onClick={prevPage}>Previous Page</button>
          <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default Planets;