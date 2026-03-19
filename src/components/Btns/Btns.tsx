import { useCallback } from "react";
import type { ICatPhoto } from "../../App";
import styles from "./Btns.module.css";

interface IBtnsProps {
  PetPet: () => void;
  onUpload: React.Dispatch<React.SetStateAction<ICatPhoto[]>>;
}

export default function Btns({ PetPet, onUpload }: IBtnsProps) {
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
      onUpload((prev) => [...prev, ...previewPhotoDate]);
      e.target.value = "";
    },
    [getImgWH],
  );

  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.petBtn} onClick={PetPet}>
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
    </>
  );
}
