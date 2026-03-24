import { useCallback, useRef, useState, type MouseEvent } from "react";
import type { ICatPhoto } from "../../App";
import styles from "./CatPhotoList.module.css";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import useIsMobile from "../Hooks/useIsMobile";

interface ICatPhotoList {
  list: ICatPhoto[];
  setCurrentCat: (url: string) => void;
}

export const CatPhotoList = ({ list, setCurrentCat }: ICatPhotoList) => {
  const [useDrawerKnob, setUseDrawerKnob] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);
  const isMobile = useIsMobile();

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  const onDragStart = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (!scrollRef.current) return;

    setIsDrag(true);

    // 모바일 일 때는 pageY와 scrollTop
    // 아니면 pageX와 scrollLef
    if (isMobile) {
      setStartX(e.pageY + scrollRef.current.scrollTop);
    } else {
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  const onDragMove = (e: MouseEvent<HTMLUListElement>) => {
    if (!isDrag || !scrollRef.current) return;

    if (isMobile) {
      scrollRef.current.scrollTop = startX - e.pageY;
    } else {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const isGetOut = useCallback(() => {
    setUseDrawerKnob((perv) => !perv);
  }, []);

  const handleScroll = useCallback(() => {}, []);
  const DrawerIcon = isMobile ? (
    useDrawerKnob ? (
      <MdKeyboardArrowUp />
    ) : (
      <MdKeyboardArrowDown />
    )
  ) : useDrawerKnob ? (
    <MdKeyboardArrowRight />
  ) : (
    <MdKeyboardArrowLeft />
  );

  return (
    <div className={styles.catPhotoList}>
      <div
        className={styles.frame}
        style={{
          width: isMobile ? "" : useDrawerKnob ? "100vw" : "",
          height: isMobile && useDrawerKnob ? "100vh" : "",
        }}
      >
        <button
          className={isMobile ? styles.MoDrawerKnob : styles.drawerKnob}
          onClick={() => {
            isGetOut();
          }}
        >
          {DrawerIcon}
        </button>
        {useDrawerKnob && (
          <ul
            className={isMobile ? styles.MoTrack : styles.tract}
            onScroll={handleScroll}
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {list.map((photo, index) => {
              return (
                <li key={index} className={styles.thumbnail}>
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
