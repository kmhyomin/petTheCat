import React, { useRef, useState } from "react";
import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const prevRotation = useRef(0);

  const listLength = list.length;
  const radius = Math.max(1, listLength * 4); //아이템 갯수에 따른 반지름

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    prevRotation.current = rotation;
  };

  //드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX.current;
    setRotation(prevRotation.current + deltaX * 0.5);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={styles.catPhotoList}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.waitForPet}>
        {!(list.length === 0) && <p>쓰다듬어지길 기다리는중...</p>}
      </div>
      <div className={styles.frame} onMouseDown={handleMouseDown}>
        <ul
          className={styles.tract}
          style={{
            transform: `rotateY(${rotation})`,
            transition: isDragging ? "none" : "transform 0.5s ease-out",
          }}
        >
          {list.map((photo, index) => {
            const itemAngle = (360 / listLength) * index;

            return (
              <li
                key={index}
                className={`${styles.thumbnail} ${photo.isRotate ? styles.rotateThumbnail : ""}`}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}rem)`,
                }}
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
