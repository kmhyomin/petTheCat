import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  return (
    <div className={styles.catPhotoList}>
      {list.map((photo, index) => (
        <img
          key={index}
          src={photo.url}
          className={styles.thumbnail}
          //   onClick={() => setCurrentCat}
          onClick={() => setCurrentCat(photo.url)}
          alt={photo.name}
        />
      ))}
    </div>
  );
};
