import axios from 'axios';
import { useEffect, useState } from 'react';

const Peoples = () => {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPeople = async () => {
          try {
            const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
            // console.log(response);
            setPeople(response.data.results);
          } catch (err) {
            // setError(err);
          }
        };
    
        fetchPeople();
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
            {people.map((person, index) => (
                <div
                    style={{width: '100px',height: '100px',border: '1px solid black'}}
                    key={index}>
                        {person.name}
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

export default Peoples;