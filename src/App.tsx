import { useCallback, useState } from "react";
import styles from "./App.module.css";
import { PetCat } from "./components/PetCat/petCat";
import { CatPhotoList } from "./components/CatPhotoList/CatPhotoList";

export interface ICatPhoto {
  name: string;
  url: string;
}

function App() {
  // const [changeColor, setChangeColor] = useState(0);
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

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      //e.currentTarget => input
      if (files) {
        const filesArray = Array.from(files);
        console.log("filesArray : ", filesArray);

        const previewData = filesArray.map((file) => {
          return {
            name: file.name,
            url: URL.createObjectURL(file),
          };
        });
        setCatPhotos((prev) => [...prev, ...previewData]);
        e.target.value = "";
      }
    },
    [],
  );
  return (
    <div className={styles.wapper}>
      <div className={styles.buttonContainer}>
        <div className={styles.petBtn} onClick={handlePetPet}>
          쓰다듬기
        </div>
        <div className={styles.addCatBtn}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            id="file-upload"
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload" className={styles.addCatBtn}>
            고양이 추가
          </label>
        </div>
        <CatPhotoList list={catPhotos} setCurrentCat={setCurrentCat} />
      </div>
      <div className={styles.container}>
        {/* 쓰다듬기 버튼이랑 container랑 분리하고 싶었음 */}
        <PetCat isMoving={isMoving} catImg={currentCat} />
      </div>
    </div>
  );
}

export default App;
