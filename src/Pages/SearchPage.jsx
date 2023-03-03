import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRepositories } from '../Actions/fetchRepositories';

const SearchPageNew = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('stars');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [repositories, setRepositories] = useState(null);
  console.log(repositories);

  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    // fetch repository data when search query, sort, per page, or page changes
    if (searchQuery !== '') {
        fetchRepositories(searchQuery, sort, perPage, page)
        .then(data => {
          setRepositories(data.items);
        });
    }
   
  }, [searchQuery, sort, perPage, page]);

  

   const handlePreviousPage = () => {
    setPage(page => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(page => Math.min(totalPages, page + 1));
  };

  const handlePageChange = (e) => {
    const newPage = parseInt(e.target.value);
    setPage(newPage);
  };

  // render search form and search results
  return (
    <div>
      <form>
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Updated</option>
        </select>
        <select value={perPage} onChange={e => setPerPage(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </form>
      <ul>
        {repositories && repositories.map(repo => (
          <li key={repo.id}>
            <Link to={`repos/${repo.id}`}>{repo.full_name}</Link>
            <div>{repo.description}</div>
            <div>{repo.stargazers_count} stars</div>
            <div>{repo.watchers_count} watchers</div>
            <div>{repo.forks_count} forks</div>
            <div>Last updated: {repo.updated_at}</div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
        <select value={page} onChange={handlePageChange}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <option value={pageNum} key={pageNum}>{pageNum}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchPageNew;
