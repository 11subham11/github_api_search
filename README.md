This is a Vite react project to search github repsitories through its unauthenticated api.

npm install
Start script :- npm run dev

Firstly, the App component imports the necessary dependencies including the CSS file, the SearchPage component, the RepoDetailPage component, and the Routes and Route components from the react-router-dom library.

Then, the App function is defined as the main component that returns the Routes component. The Routes component is responsible for rendering different components based on the current URL. The Route component defines a specific route and the component to be rendered for that route.

There are two routes defined in this application. The first route has the path of / which represents the homepage, and the exact prop indicates that this path should be an exact match. The SearchPage component is specified as the element to be rendered for this route. This component is responsible for rendering the search bar and the list of repositories.

The second route has the path of /repos/:repoId, where :repoId is a parameter representing the ID of a specific repository. The exact prop is also provided to ensure that this path is an exact match. The RepoDetailPage component is specified as the element to be rendered for this route. This component is responsible for rendering the details of a specific repository based on the repoId parameter.

.Search Page:

This is a React component that displays a search form for searching GitHub repositories and a list of search results.

The component imports the following from external libraries:

. React and its hooks useState and useEffect
. Link from react-router-dom
. fetchRepositories function from a local file ../Actions/fetchRepositories.js
. BiSearchAlt, BiGitRepoForked, AiOutlineStar, and GrFormView icons from react-icons 

The component defines several pieces of state using the useState hook:

. searchQuery: a string representing the search query entered by the user
. searching: a boolean representing whether a search is currently in progress
. sort: a string representing the sorting criteria for search results
. perPage: an integer representing the number of search results to display per page
. page: an integer representing the current page of search results
. repositories: an array of search results fetched from the GitHub API
. totalPages: an integer representing the total number of pages of search results

The component uses the useEffect hook to fetch new search results from the GitHub API whenever any of the following state values change: searchQuery, sort, perPage, or page. If the searchQuery value is an empty string, no search is performed.

The component defines two helper functions:

. handlePreviousPage: a function that decrements the page value by 1, ensuring that the new value is at least 1
. handleNextPage: a function that increments the page value by 1, ensuring that the new value is no greater than totalPages

The component renders a search form with three input fields:

. A text input field for entering the search query
. A select field for choosing the sorting criteria
. A select field for choosing the number of search results to display per page

The component also renders a list of search results as an unordered list. For each search result, the component displays the following information:

. The repository name
. The number of stars the repository has
. The number of watchers the repository has
. The number of forks the repository has

If the repositories value is null, the component does not render any search results.

.Repo Detail Page

The RepoDetailPage component is a React functional component that displays details of a specific repository. The component uses the useParams hook from the react-router-dom library to retrieve the repoId parameter from the URL. It then uses the fetchRepositoriesById function from the ../Actions/fetchRepositoriesById module to fetch the repository details based on the repoId. The component uses the useState and useEffect hooks to manage state and trigger the fetch request respectively.

This component imports the following libraries/modules:

. useEffect and useState hooks from the react library
. useParams hook from the react-router-dom library
. fetchRepositoriesById function from the ../Actions/fetchRepositoriesById module

The RepoDetailPage component:

. Retrieves the repoId parameter from the URL using the useParams hook.
. Uses the useState hook to create a repo state variable and initialize it to null.
. Uses the useEffect hook to trigger a fetch request to retrieve the repository details when the repoId parameter changes. It sets the repo state variable to the fetched data.
. Displays a loading message if repo is null.
. Displays the repository details in a formatted manner using the repo state variable.

