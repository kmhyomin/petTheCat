import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  return (
    <div className={styles.frame}>
      <ul className={styles.catPhotoList}>
        {list.map((photo, index) => (
          <li
            key={index}
            className={`${styles.thumbnail} ${photo.isRotate ? styles.rotateThumbnail : ""}`}
          >
            <img
              src={photo.url}
              onClick={() => setCurrentCat(photo.url)}
              alt={photo.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
