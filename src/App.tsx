import styles from './App.module.css';
import { PetCat } from './components/PetCat/petCat';
import { CatPhotoList } from './components/CatPhotoList/CatPhotoList';
import Btns from './components/Btns/Btns';
import { useCat } from './Hooks/catContext.tsx';
import { BgColorChanger } from './components/BgColorChanger/BgColorChanger.tsx';

function App() {
  const { bgColor } = useCat();

  return (
    <>
      <div
        className={styles.wapper}
        style={{ '--bgColor': `${bgColor}` } as React.CSSProperties}
      >
        <div className={styles.buttonContainer}>
          <Btns />
        </div>
        <div className={styles.PetCat}>
          <PetCat />
        </div>
        <div className={styles.listContainer}>
          <CatPhotoList />
        </div>
        <div className={styles.BgColorChanger}>
          <BgColorChanger />
        </div>
      </div>
    </>
  );
}

export default App;
