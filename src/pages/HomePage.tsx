import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import styles from "../styles/pages/HomePage.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RepositoryCard from "../components/RepositoryCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import Error from "../components/Error";
import { useEffect, useState } from "react";
import { fetchResults } from "../redux/slices/searchSlice";
import { RepositoryType, UserType } from "../types/UserRepo";

export default function HomePage() {
  const { data, status, error, totalPages } = useAppSelector((state) => state.search);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("users");
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.trim()) {
      dispatch(fetchResults({ query, type, page }));
    }
  }, [query, type, page, dispatch]);

  return (
    <>
      <div className={styles.header}>
        <img src="/github-logo.png" alt="github-logo" className={styles.headerImg} />
        <div className={styles.headerText}>
          <h1>Github Searcher</h1>
          <p>Search users or repositories below</p>
        </div>
      </div>
      <SearchBar setQuery={setQuery} setType={setType} setPage={setPage} />
      <section className={styles.cardContainer}>
        {status === "loading" && <Loading />}
        {status === "failed" ? (
          <Error error={error} />
        ) : (
          data.map((item) => ("type" in item ? <UserCard key={item.id} user={item as UserType} /> : <RepositoryCard key={item.id} repo={item as RepositoryType} />))
        )}
      </section>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
}
