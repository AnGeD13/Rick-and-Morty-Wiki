import styles from "./characterCard.module.css";
import PropTypes from 'prop-types';
import getStatusColor from "@utils/getStatusColor";
import formatDate from "@utils/formatDate";

export function CharacterCard({character}) {
  return (
    <article className={styles.characterCard}>
      <h2 className={styles.characterName}>{character.name}</h2>
      <footer className={styles.additionalInfo}>
        <p>Status: <span className={getStatusColor(character.status)}>{character.status}</span></p>
        <p>Created: <time dateTime={character.created}>{formatDate(character.created)}</time></p>
      </footer>
    </article>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};