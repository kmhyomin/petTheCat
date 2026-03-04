import { useState } from "react";
import styles from "./App.module.css";
import { backgroundColorList } from "./data/backgroundColor";
import { PetCat } from "./components/PetCat/petCat";

function App() {
  const [changeColor, setChangeColor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  

  const handlePetPet = () => {
    setChangeColor((prev) => (prev += 1) % backgroundColorList.length);
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  };

  return (
    <div
      className={styles.wapper}
      style={{
        backgroundColor: backgroundColorList[changeColor].backgroundColor,
      }}
    >
      <div className={styles.petBtn} onClick={handlePetPet}>
        쓰다듬기
      </div>
      <div className={styles.container}>
        {/* 쓰다듬기 버튼이랑 container랑 분리하고 싶었음 */}
        <PetCat isMoving={isMoving} />
      </div>
    </div>
  );
}

export default App;
