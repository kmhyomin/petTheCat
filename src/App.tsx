import { useState } from "react";
import styles from "./App.module.css";
import { backgroundColorList } from "./data/backgroundColor";
import { PetCat } from "./components/PetCat/petCat";

function App() {
  // const [changeColor, setChangeColor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [catPhotos, setCatPhotos] = useState<string[]>([]);
  const [currentCat, setCurrentCat] = useState("../cat1.png");

  const handlePetPet = () => {
    // setChangeColor((prev) => (prev += 1) % backgroundColorList.length);
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newCat = files.map((file) => URL.createObjectURL(file));

    setCatPhotos((perv) => [...perv, ...newCat]);
  };

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
            onInput={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            id="file-upload"
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload" className={styles.addCatBtn}>
            고양이 추가
          </label>
        </div>
        <div className={styles.catPhotoList}>
          {catPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              className={styles.thumbnail}
              onClick={() => setCurrentCat(photo)}
              alt="미리보기"
            />
          ))}
        </div>
      </div>
      <div className={styles.container}>
        {/* 쓰다듬기 버튼이랑 container랑 분리하고 싶었음 */}
        <PetCat isMoving={isMoving} catImg={currentCat} />
      </div>
    </div>
  );
}

export default App;
