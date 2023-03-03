import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchRepositoriesById } from "../Actions/fetchRepositoriesById";

function RepoDetailPage() {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {

    fetchRepositoriesById(repoId).then(data => {
        setRepo(data);
    });
  }, [repoId]);

  if (!repo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{repo.full_name}</h1>
      <p>Open Issues: {repo.open_issues_count}</p>
      <p>Default Branch: {repo.default_branch}</p>
      <p>
        Owner:{" "}
        <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
          {repo.owner.login}
        </a>
      </p>
      <p>
        Repository:{" "}
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </p>
    </div>
  );
}

export default RepoDetailPage;
