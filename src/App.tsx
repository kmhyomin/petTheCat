import { useCallback, useState } from "react";
import styles from "./App.module.css";
import { PetCat } from "./components/PetCat/petCat";
import { CatPhotoList } from "./components/CatPhotoList/CatPhotoList";
import Btns from "./components/Btns/Btns";

export interface ICatPhoto {
  name: string;
  url: string;
  isRotate: boolean;
}

function App() {
  const [isMoving, setIsMoving] = useState(false);
  const [catPhotos, setCatPhotos] = useState<ICatPhoto[]>([]);
  const [currentCat, setCurrentCat] = useState("../cat1.png");

  const handlePetPet = () => {
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  };

  return (
    <div className={styles.wapper}>
      <Btns PetPet={handlePetPet} onUpload={setCatPhotos} />
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
