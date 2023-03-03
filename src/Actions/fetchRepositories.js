import axios from "axios";

const config = {
    headers : {
        Authorization: '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'
    }
}
export const fetchRepositories = async (searchQuery, sort, perPage, page) => {
  const url = `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sort}&per_page=${perPage}&page=${page}`;
  return await axios
    .get(url , config)
    .then((response) => {
      // return the repository data from the response
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
