import { useEffect, useRef, useState } from 'react';
import styles from './petCat.module.css';
import { useCat } from '../../Hooks/catContext.tsx';

export const PetCat = () => {
  const { isMoving, currentCat } = useCat();
  const catRef = useRef<HTMLDivElement>(null);
  const [moveY, setMoveY] = useState(0);

  const calcHeight = () => {
    const realHeight = catRef.current?.offsetHeight || 0;
    const isHeightSmall = realHeight < 200;
    console.log('isHeightSmall ?? :', isHeightSmall);

    if (catRef.current) {
      setMoveY(realHeight * 0.6);
      if (isHeightSmall) {
        setMoveY(realHeight * 0.9);
      }
    }
  };

  useEffect(() => {
    const imgElement = catRef.current?.querySelector('img');
    if (imgElement) {
      if (imgElement.complete) calcHeight();
      else imgElement.onload = calcHeight;
      // onload 함수는 페이지가 로드되면 자동으로 실행되는 전역 콜백 함수임.
      // 근데 useEffet에 달았으니 catImg가 바뀔때마다 실행하는 것임!!
    }

    window.addEventListener('resize', calcHeight);
    // 창의 크기가 바뀌면 사진의 크기도 바뀌기 때문에 calcHeight을 실행해 주는것.
    // 근데 왜 ()가 붙지 않았뜸?
    // 그 이유는 ()은 지금 당장 진행시켜. 임
    // ()를 안 붙이면 필요할때 써~ 너낌임
    // 브라우저야, 지금 당장 실행하지 말고 나중에 resize 이벤트가 발생하면
    // 이 함수를 실행해줘~ 라고 예약을 거는것임.

    console.log('moveY : ', moveY);

    return () => window.removeEventListener('resize', calcHeight);
    // 뒷정리 코드임. 자세한 설명은 26.05.13일자 노션에 있뜸!
  }, [currentCat]);

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
        <img src={currentCat} alt="쓰다듬기 위한 굉이 사진" />
      </div>
    </div>
  );
};
