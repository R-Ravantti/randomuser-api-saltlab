import React, { useState, useEffect } from 'react';
import './App.css';

type randomUser = {
  results: [
    {
      gender: string,
      name: {
        title: string,
        first: string,
        last: string
      },
      location: {
        street: {
          number: number,
          name: string
        },
        city: string,
        state: string,
        country: string,
        postcode: number,
        coordinates: {
          latitude: number,
          longitude: number
        },
        timezone: {
          offset: string,
          description: string
        }
      },
      email: string,
      login: {
        uuid: string,
        username: string,
        password: string,
        salt: string,
        md5: string,
        sha1: string,
        sha256: string
      },
      dob: {
        date: string,
        age: number
      },
      registered: {
        date: string,
        age: number
      },
      phone: string,
      cell: string,
      id: {
        name: string,
        value: string
      },
      picture: {
        large: string,
        medium: string,
        thumbnail: string
      },
      nat: string
    }
  ],
  info: {
    seed: string,
    results: number,
    page: number,
    version: number
  }
}

async function fetchRandomUser(setUser: React.Dispatch<React.SetStateAction<randomUser | undefined>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>) {
  const response = await fetch("https://randomuser.me/api/");
  const userJson: randomUser = await response.json();
  setUser(userJson);
  setUsername(userJson.results[0].name.first + " " + userJson.results[0].name.last);
}

function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;
  const formElements = form.elements as typeof form.elements & {
    usernameInput: HTMLInputElement
  }
 
}

function App() {

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
   
    setUsername(e.currentTarget.username.value);
  }

  const [user, setUser] = useState<randomUser>();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetchRandomUser(setUser, setUsername);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
        {user?.results[0].location.street.number} {user?.results[0].location.street.name} {user?.results[0].location.city}
        </p>
        <p>
        {user?.results[0].dob.age}
        </p>
        <p>
          {username}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User name:</label>
            <input id="username" name="username" type="text" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
