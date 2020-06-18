import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

const mock = {
  id: "123",
  url: "https://github.com/josepholiveira",
  title: "Desafio ReactJS",
  techs: ["React", "Node.js"],
}

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    const { data } = await api.get("/repositories");
    setRepositories(data);
  };

  async function handleAddRepository() {
    const newRepos = [...repositories];
    newRepos.push(mock);
    setRepositories(newRepos);
    await api.post(`/repositories`, mock);
    return;
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    // return await getRepositories();
    const newRepos = [...repositories];
    newRepos.map((repo, i) => {
      if (repo.id === id) {
        newRepos.splice(i, 1);
      }
    });
    
    setRepositories(newRepos || []);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index) => (
          <li key={index}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
