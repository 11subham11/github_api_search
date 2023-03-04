import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRepositories } from "../Actions/fetchRepositories";
import { BiSearchAlt, BiGitRepoForked } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import {CgExport} from 'react-icons/cg'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("stars");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [repositories, setRepositories] = useState(null);
  console.log(repositories);

  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    // fetch repository data when search query, sort, per page, or page changes
    if (searchQuery !== "") {
      fetchRepositories(searchQuery, sort, perPage, page).then((data) => {
        setRepositories(data.items);
      });
    }
  }, [searchQuery, sort, perPage, page]);

  const handlePreviousPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage((page) => Math.min(totalPages, page + 1));
  };

  const handlePageChange = (e) => {
    const newPage = parseInt(e.target.value);
    setPage(newPage);
  };

  // render search form and search results
  return (
    <>
      <div className="flex items-center justify-center p-4 flex-col">
        <form class="flex space-x-4 p-2">
          <div class="flex gap-4 justify-center items-center h-full">
            <div className="flex justify-center h-full">
              <label htmlFor="search">Repository Name : </label>
            </div>
            <div className=" relative flex justify-center">
              <input
                type="text"
                name="search"
                class="block w-full py-2 pr-10 pl-4 placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <BiSearchAlt />
              </div>
            </div>
          </div>
          <div class="flex gap-4 justify-center items-center h-full">
            <div className="flex justify-center h-full">
              <label htmlFor="sort">Sort By : </label>
            </div>
            <div className="flex justify-center ">
              <select
                name="sort"
                class="block w-full p-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Updated</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4  justify-center items-center h-full">
            <div className="flex justify-center h-full">
              <label htmlFor="pages">Result Per Page : </label>
            </div>
            <div className="flex justify-center">
              <select
                name="pages"
                class="block w-full p-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      {repositories ? (
        <div className="w-full px-20 py-10">
          <h1 className="text-center mb-6 text-2xl font-extrabold text-gray-300">
            Search Results
          </h1>
          <ul className="grid grid-cols-2 gap-4">
            {repositories.map((repo) => (
              <li
                key={repo.id}
                className="relative bg-gray-300 px-6 py-4 text-gray-800 flex flex-col justify-center rounded-lg"
              >
                <p className="font-sans">
                  <span className="font-bold">Repository Name :</span>{" "}
                  {repo.full_name}
                </p>
                <p className="flex items-center">
                  <AiOutlineStar className="mr-2" />
                  <span>{repo.stargazers_count} stars</span>
                </p>
                <p className="flex items-center">
                  <GrFormView className="mr-2" />
                  <span>{repo.watchers_count} watchers</span>
                </p>
                <p className="flex items-center">
                  <BiGitRepoForked className="mr-2" />
                  <span>{repo.forks_count} forks</span>
                </p>
                <p>
                  <span className="font-bold"> Last updated :</span>{" "}
                  {repo.updated_at}
                </p>
                <p>
                  {" "}
                  <span className="font-bold"> Description :</span>{" "}
                  {repo.description}
                </p>
                <div className="absolute top-10 right-10">
                  <Link to={`repos/${repo.id}`} className='bg-green-600 p-2 rounded text-gray-200 hover:bg-green-800'>Details</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-40 flex items-center justify-center h-full ">
          <p className="text-2xl">
            Content Not Found please Enter search string to begin search
          </p>
        </div>
      )}

      {repositories && (
        <div>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
          <select value={page} onChange={handlePageChange}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <option value={pageNum} key={pageNum}>
                  {pageNum}
                </option>
              )
            )}
          </select>
        </div>
      )}
    </>
  );
};

export default SearchPage;
