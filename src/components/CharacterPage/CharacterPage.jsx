import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./characterpage.module.css";
import getStatusColor from "@utils/getStatusColor";
import formatDate from "@utils/formatDate";
import { BASE_URL, NO_DATA} from "@utils/constants";

export default function CharacterPage() {
  const {id} = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const respone = await fetch(`${BASE_URL}/${id}`);
        const jsonData = await respone.json();
        for (let key in jsonData) {
          if (!jsonData[key]){
            jsonData[key] = NO_DATA;
          }
        }
        setCharacter(jsonData);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id])

  if (loading) {
    return <div className="loading"></div>
  }

  return (
    <main className={styles.card}>
      <img 
        src={character.image} 
        alt={`photo of ${character.name}`} 
        className={styles.photo}
      />
      <ul className={styles.textInfo}>
        <li>Name: <span className={styles.categoryValue}>{character.name}</span></li>
        <li>Status: <span className={getStatusColor(character.status)}>{character.status}</span></li>
        <li>Species: <span className={styles.categoryValue}>{character.species}</span></li>
        <li>Type: <span className={styles.categoryValue}>{character.type}</span></li>
        <li>Gender: <span className={styles.categoryValue}>{character.gender}</span></li>
        <li>Origin: <span className={styles.categoryValue}>{character && character.origin && character.origin.name}</span></li>
        <li>Location: <span className={styles.categoryValue}>{character && character.location && character.location.name}</span></li>
        <li>Created: <time dateTime={character.created} className={styles.categoryValue}>{formatDate(character.created)}</time></li>
        <li>URL: <a href={character.url} target="_blank" className={styles.categoryValue}>api</a></li>
      </ul>
    </main>
  )
}