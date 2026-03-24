import styles from "./petCat.module.css";

interface IPetCatItem {
  isMoving: boolean;
  catImg?: string;
  red: number;
}

export const PetCat = ({ isMoving, catImg, red }: IPetCatItem) => {
  const boomPetStyle = {
    color: `rgb(${red},0,0)`,
  };
  return (
    <div className={styles.petCatBox}>
      <div
        className={`${styles.petHand} ${isMoving ? styles.activePetHand : ""}`}
        style={boomPetStyle}
      >
        <img src="./../petHand.png" alt="쓰다듬는 소온" />
      </div>
      <div className={`${styles.catImg} ${isMoving ? styles.squeshCat : ""}`}>
        <img src={catImg} alt="쓰다듬기 위한 굉이 사진" />
      </div>
    </div>
  );
};
