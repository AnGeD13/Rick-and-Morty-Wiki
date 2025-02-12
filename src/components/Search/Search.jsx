import PropTypes from 'prop-types';
import styles from './search.module.css';
import { useEffect, useRef } from 'react';

export default function Search({value, handleSearchChange}) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, [])

  return (
    <input 
      ref={searchRef}
      type="search" 
      placeholder="Search characters..."
      className={styles.searchForm}
      onChange={handleSearchChange}
      value={value}
    />
  )
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

