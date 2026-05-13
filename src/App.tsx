import styles from './App.module.css';
import { PetCat } from './components/PetCat/petCat';
import { CatPhotoList } from './components/CatPhotoList/CatPhotoList';
import Btns from './components/Btns/Btns';
import { CatProvider } from './Hooks/catContext.tsx';

function App() {
  const bgColor = '#fff';

  return (
    <CatProvider>
      <div
        className={styles.wapper}
        style={{ '--bgColor': `${bgColor}` } as React.CSSProperties}
      >
        <div className={styles.buttonContainer}>
          <Btns />
        </div>
        <div className={styles.container}>
          <div className={styles.PetCat}>
            <PetCat />
          </div>
        </div>
        <div className={styles.listContainer}>
          <CatPhotoList />
        </div>
      </div>
    </CatProvider>
  );
}

export default App;
