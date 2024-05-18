/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useDebounce, { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPlanets, setPage, setSearchQuery } from "../features/planets/planetsSlice";

const PlanetList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { planets, page, totalPages, searchQuery, loading, error } = useAppSelector(
    (state) => state.planets
  );

  const [query, serchQuery] = useState(searchQuery);
  const deboucedQuery = useDebounce(query, 700);

  useEffect(() => {
    dispatch(fetchPlanets({ page, searchQuery: deboucedQuery }));
  }, [dispatch, page, deboucedQuery]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    serchQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <div className="users">
      <h1>Planets</h1>
      <div>
        <input type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch} 
        />
      </div>
      <div>
        {planets.map((planet: any) => (
          <div key={planet.name} className="user-card">
            <h3>{planet.name}</h3>
            <p>Climate: {planet.climate}</p>
            <p>Population: {planet.population}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PlanetList;
