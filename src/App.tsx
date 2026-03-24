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
  const [red, setRed] = useState(0);

  // console.log("sss isMoving", isMoving);

  const handlePetPet = useCallback(() => {
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  }, [isMoving]);

  return (
    <div className={styles.wapper}>
      <div className={styles.buttonContainer}>
        <Btns PetPet={handlePetPet} onUpload={setCatPhotos} setRed={setRed} />
      </div>
      <div className={styles.container}>
        <div className={styles.PetCat}>
          <PetCat isMoving={isMoving} catImg={currentCat} red={red} />
        </div>
      </div>
      <div className={styles.listContainer}>
        <CatPhotoList list={catPhotos} setCurrentCat={setCurrentCat} />
      </div>
    </div>
  );
}

export default App;
