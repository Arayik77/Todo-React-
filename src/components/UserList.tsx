/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useDebounce, { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, setPage, setSearchQuery } from "../features/users/userSlice";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, page, totalPages, searchQuery, loading, error } = useAppSelector(
    (state) => state.users
  );

  const [query, serQuery] = useState(searchQuery);
  const deboucedQuery = useDebounce(query, 700);

  useEffect(() => {
    dispatch(fetchUsers({ page, searchQuery: deboucedQuery }));
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
    serQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <div className="users">
      <h1>Users</h1>
      <div>
        <input type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch} 
        />
      </div>
      <div>
        {users.map((user: any) => (
          <div key={user.name} className="user-card">
            <h3>{user.name}</h3>
            <p>Height: {user.height}</p>
            <p>Mass: {user.mass}</p>
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

export default UserList;
