import styles from "./searchPage.module.css";
import Search from "../Search/Search";
import { useState } from "react";
import { useEffect } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Link } from "react-router-dom";
import { BASE_URL } from "@utils/constants";


export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value;
    setSearchValue(newSearchText);
    sessionStorage.setItem("searchText", newSearchText);
  };

  useEffect(() => {
    const savedSearchText = sessionStorage.getItem('searchText');
    if (savedSearchText) {
      setSearchValue(savedSearchText);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const respone = await fetch(`${BASE_URL}/?name=${searchValue}`);
        const jsonData = await respone.json();
        if (jsonData.error) {
          setError(true);
          setCharacters([]);
        } else {
          setError(false);
          setCharacters(jsonData.results);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (searchValue.trim().length > 3) {
      fetchData();
    }

    }, [searchValue]);

  return (
    <main className={styles.block}>
      <form>
        <Search
          value={searchValue}
          handleSearchChange={handleSearchChange}
        />
        {characters &&
          <p className={styles.found}>Found characters: {characters.length}</p>
        }
      </form>
      {searchValue && error && <div>Nothing found...</div>}
      {searchValue && loading && <div className="loading"></div>}
      <ul className={styles.cards}>
        {characters && characters.map(character => (
          <li 
            key={character.id} 
            className={styles.cardWrapper}
          >
            <Link to={`character/${character.id}`}>
              <CharacterCard
                character={character}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}