import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchRepositoriesById } from "../Actions/fetchRepositoriesById";

function RepoDetailPage() {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetchRepositoriesById(repoId).then((data) => {
      setRepo(data);
    });
  }, [repoId]);

  if (!repo) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-300 p-6 text-gray-900 rounded">
        <p>
          <span className="font-bold mr-2">Owner Name :</span>
          <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
            {repo.owner.login}
          </a>
        </p>
        <p>
          <span className="font-bold mr-2">Repository :</span>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </p>

        <p>
          {" "}
          <span className="font-bold mr-2">Open Issues :</span>{" "}
          {repo.open_issues_count}
        </p>
        <p>
          <span className="font-bold mr-2">Default Branch :</span>{" "}
          {repo.default_branch}
        </p>
      </div>
    </div>
  );
}

export default RepoDetailPage;
