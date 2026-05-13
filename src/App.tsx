import { useCallback, useState } from 'react';
import styles from './App.module.css';
import { PetCat } from './components/PetCat/petCat';
import { CatPhotoList } from './components/CatPhotoList/CatPhotoList';
import Btns from './components/Btns/Btns';

export interface ICatPhoto {
  name: string;
  url: string;
  isRotate: boolean;
}
const defaultCat: ICatPhoto = {
  name: '기본고양이',
  url: '../public/cat1.png',
  isRotate: false,
};
// 슬라이드 바에 기본 고양이 넣을 iterface를 넣음
function App() {
  const [isMoving, setIsMoving] = useState(false);
  const [catPhotos, setCatPhotos] = useState<ICatPhoto[]>([defaultCat]);
  const [currentCat, setCurrentCat] = useState(defaultCat.url);

  const bgColor = '#fff';

  const handlePetPet = useCallback(() => {
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  }, [isMoving]);

  return (
    <div
      className={styles.wapper}
      style={{ '--bgColor': `${bgColor}` } as React.CSSProperties}
    >
      <div className={styles.buttonContainer}>
        <Btns PetPet={handlePetPet} onUpload={setCatPhotos} />
      </div>
      <div className={styles.container}>
        <div className={styles.PetCat}>
          <PetCat isMoving={isMoving} catImg={currentCat} />
        </div>
      </div>
      <div className={styles.listContainer}>
        <CatPhotoList list={catPhotos} setCurrentCat={setCurrentCat} />
      </div>
    </div>
  );
}

export default App;
