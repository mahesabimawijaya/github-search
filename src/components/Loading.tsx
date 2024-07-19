import styles from "../styles/components/Loading.module.css";

const Loading: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
