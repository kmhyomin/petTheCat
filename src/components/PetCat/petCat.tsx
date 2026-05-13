import { useEffect, useRef, useState } from 'react';
import styles from './petCat.module.css';

interface IPetCatItem {
  isMoving: boolean;
  catImg?: string;
}

export const PetCat = ({ isMoving, catImg }: IPetCatItem) => {
  const catRef = useRef<HTMLDivElement>(null);
  const [moveY, setMoveY] = useState(0);

  const calcHeight = () => {
    const realHieght = catRef.current?.offsetHeight || 0;
    const isHeightSmall = realHieght < 200;
    console.log('isHeightSmall ?? :', isHeightSmall);

    if (catRef.current) {
      setMoveY(realHieght * 0.6);
      if (isHeightSmall) {
        setMoveY(realHieght * 0.9);
      }
    }
  };

  useEffect(() => {
    const imgElement = catRef.current?.querySelector('img');
    if (imgElement) {
      if (imgElement.complete) calcHeight();
      else imgElement.onload = calcHeight;
    }

    window.addEventListener('resize', calcHeight);
    console.log('moveY : ', moveY);

    return () => window.removeEventListener('resize', calcHeight);
  }, [catImg]);

  return (
    <div className={styles.petCatBox}>
      <div
        className={`${styles.petHand} ${isMoving ? styles.activePetHand : null}`}
        style={{ '--move-y': `${moveY}px` } as React.CSSProperties}
      >
        <img src="./../petHand.png" alt="쓰다듬는 소온" />
      </div>
      <div
        className={`${styles.catImg} ${isMoving ? styles.squeshCat : null}`}
        ref={catRef}
      >
        <img src={catImg} alt="쓰다듬기 위한 굉이 사진" />
      </div>
    </div>
  );
};
