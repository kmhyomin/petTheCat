import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  return (
    <div className={styles.catPhotoList}>
      <div className={styles.frame}>
        <button className={styles.drawerKnob}></button>
        <ul className={styles.tract}>
          {list.map((photo, index) => {
            return (
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
            );
          })}
        </ul>
      </div>
    </div>
  );
};
