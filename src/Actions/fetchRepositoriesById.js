import axios from "axios";

const config = {
    headers : {
        Authorization: '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'
    }
}
export const fetchRepositoriesById = async (repoId) => {
  const url = `https://api.github.com/repositories/${repoId}`;
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
