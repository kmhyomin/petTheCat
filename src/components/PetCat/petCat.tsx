import { useEffect, useRef, useState } from 'react';
import styles from './petCat.module.css';
import { useCat } from '../../Hooks/catContext.tsx';

export const PetCat = () => {
  const { isMoving, currentCat } = useCat();
  const catRef = useRef<HTMLDivElement>(null);
  const [moveY, setMoveY] = useState<number>(0);

  const calcHeight = () => {
    const realHeight = catRef.current?.offsetHeight || 0;
    const isHeightSmall = realHeight < 300;

    if (catRef.current) {
      setMoveY(realHeight * 0.6);
      if (isHeightSmall) {
        setMoveY(realHeight * 0.8);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', calcHeight);

    return () => window.removeEventListener('resize', calcHeight);
  }, [currentCat]);

  const handleImageLoad = () => {
    calcHeight();
  };

  return (
    <div className={styles.petCatBox}>
      <div
        className={`${styles.petHand} ${isMoving ? styles.activePetHand : ''}`}
        style={
          {
            '--move-y': `${moveY}px`,
          } as React.CSSProperties
        }
      >
        <img src="./../petHand.png" alt="쓰다듬는 소온" />
      </div>

      <div
        className={`${styles.catImg} ${isMoving ? styles.squeshCat : ''}`}
        ref={catRef}
      >
        <img
          src={currentCat}
          alt="쓰다듬기 위한 굉이 사진"
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};
