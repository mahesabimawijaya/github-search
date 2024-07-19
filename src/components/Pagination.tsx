import styles from "../styles/components/Pagination.module.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { IconContext } from "react-icons";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  return (
    <>
      <div className={styles.pagination}>
        <IconContext.Provider value={{ size: "26px" }}>
          <FaCircleArrowLeft style={{ opacity: page > 1 ? 1 : 0.6, cursor: "pointer" }} onClick={() => page > 1 && setPage(page - 1)} />
          {page} / {totalPages}
          <FaCircleArrowRight style={{ opacity: page < totalPages ? 1 : 0.6, cursor: "pointer" }} onClick={() => page < totalPages && setPage(page + 1)} />
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Pagination;
