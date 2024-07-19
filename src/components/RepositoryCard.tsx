import { RepositoryType } from "../types/UserRepo";
import { FaStar, FaEye, FaClock } from "react-icons/fa6";
import { FaCodeFork } from "react-icons/fa6";
import styles from "../styles/components/Card.module.css";

const RepositoryCard: React.FC<{ repo: RepositoryType }> = ({ repo }) => {
  return (
    <a href={repo.html_url}>
      <div className={styles.repoCard}>
        <p className={styles.userName}>{repo.name}</p>
        <div className={styles.repoOwner}>
          <img src={repo.owner.avatar_url} className={styles.repoPfp} alt="avatar" />
          <p className={styles.truncate}>{repo.owner.login}</p>
        </div>
        <p className={styles.repoDesc}>{repo.description}</p>
        <p className={styles.repoCreatedAt}>
          <FaClock /> <span>{new Date(repo.created_at).toDateString()}</span>
        </p>
        <div className={styles.repoStat}>
          <p>
            <FaStar /> <span className={styles.bold}>{repo.stargazers_count}</span>
          </p>
          <p>
            <FaEye /> <span className={styles.bold}>{repo.watchers_count}</span>
          </p>
          <p>
            <FaCodeFork /> <span className={styles.bold}>{repo.forks_count}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default RepositoryCard;
