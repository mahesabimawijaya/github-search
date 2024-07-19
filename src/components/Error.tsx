import styles from "../styles/components/Loading.module.css";

const Error: React.FC<{ error: string | null }> = ({ error }) => {
  return (
    <div className={styles.container}>
      <p>Error: {error}</p>
    </div>
  );
};

export default Error;
