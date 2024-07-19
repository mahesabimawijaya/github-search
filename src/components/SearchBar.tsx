import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import styles from "../styles/components/SearchBar.module.css";

const options = ["Users", "Repositories"];

type SearchBarProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ setQuery, setType, setPage }) => {
  const [isActive, setIsActive] = useState(false);
  const [localType, setLocalType] = useState("Users");
  const [localQuery, setLocalQuery] = useState("");
  const [debouncedQuery] = useDebounce(localQuery, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  useEffect(() => {
    setQuery(debouncedQuery);
    setPage(1); // Reset to the first page on new search
  }, [debouncedQuery, setQuery, setPage]);

  return (
    <nav className={styles.searchBar}>
      <input type="text" onChange={handleChange} placeholder="Typing to search users or repositories" className={styles.input} />
      <div className={styles.dropdown}>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={styles.button}
        >
          {localType} <img src="down.png" alt="down" className={styles.downArrow} />
        </button>
        {isActive && (
          <div className={styles.options}>
            {options.map((option, i) => {
              return (
                <p
                  key={i}
                  onClick={() => {
                    setType(option.toLowerCase());
                    setLocalType(option);
                    setPage(1);
                    setIsActive(false);
                  }}
                  className={styles.option}
                >
                  {option}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default SearchBar;
