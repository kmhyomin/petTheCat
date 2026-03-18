import { useCallback, useState } from "react";
import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  const [useDrawerKnob, setUseDrawerKnob] = useState(false);

  const isGetOut = useCallback(() => {
    setUseDrawerKnob((perv) => !perv);
  }, []);

  console.log("sss useDrawerKnob:", useDrawerKnob);

  return (
    <div className={styles.catPhotoList}>
      <div
        className={styles.frame}
        style={{
          width: useDrawerKnob ? "100vw" : "",
        }}
      >
        <button
          className={styles.drawerKnob}
          onClick={() => {
            isGetOut();
          }}
        >
          {useDrawerKnob ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button>
        {useDrawerKnob && (
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
        )}
      </div>
    </div>
  );
};
