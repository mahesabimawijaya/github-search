import styles from "../styles/components/Card.module.css";
import { UserType } from "../types/UserRepo";

const UserCard: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={user.html_url}>
      <div className={styles.userCard}>
        <img src={user.avatar_url} alt="profile" className={styles.userPfp} />
        <p className={styles.userLocation}>{user.location}</p>
        <p className={styles.userName}>{user.name || user.login}</p>
        <p className={styles.userBio}>{user.bio || "unknown"}</p>
        <div className={styles.userFollow}>
          <p>
            <span className={styles.bold}>{user.followers}</span> followers
          </p>
          <p>
            <span className={styles.bold}>{user.following}</span> following
          </p>
          <p>
            <span className={styles.bold}>{user.public_repos}</span> public repos
          </p>
        </div>
      </div>
    </a>
  );
};

export default UserCard;
