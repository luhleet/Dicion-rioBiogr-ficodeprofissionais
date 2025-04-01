import React, { useEffect, useState } from 'react';

function App() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetch('/.netlify/functions/getProfiles')
            .then((response) => response.json())
            .then((data) => setProfiles(data))
            .catch((error) => console.error('Erro ao carregar perfis:', error));
    }, []);

    return (
        <div className="App">
            <h1>Perfis</h1>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <h2>{profile.name}</h2>
                        <p>{profile.profession}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
