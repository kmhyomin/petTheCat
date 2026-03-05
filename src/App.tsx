import { useCallback, useState } from "react";
import styles from "./App.module.css";
import { PetCat } from "./components/PetCat/petCat";
import { CatPhotoList } from "./components/CatPhotoList/CatPhotoList";

export interface ICatPhoto {
  name: string;
  url: string;
  isRotate: boolean;
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
  const getImgWH = useCallback(
    (file: File): Promise<{ width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const render = new FileReader();

        render.onload = (e) => {
          const img = new Image();

          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
          img.onerror = () =>
            reject("이미지의 width와 height를 읽어올 수 없습니다.");
          img.src = e.target?.result as string;
        };
        render.readAsDataURL(file);
      });
    },
    [],
  );

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (!files) return;

      //e.currentTarget => input

      const filesArray = Array.from(files);
      const previewPhotoDate: ICatPhoto[] = [];

      for (const file of filesArray) {
        const { width, height } = await getImgWH(file);
        const isRotate = height > width;
        const newPhoto = {
          name: file.name,
          url: URL.createObjectURL(file),
          isRotate: isRotate,
        };
        previewPhotoDate.push(newPhoto);
      }
      setCatPhotos((prev) => [...prev, ...previewPhotoDate]);
      e.target.value = "";
    },
    [getImgWH],
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
      </div>
      <div className={styles.container}>
        {/* 쓰다듬기 버튼이랑 container랑 분리하고 싶었음 */}
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
