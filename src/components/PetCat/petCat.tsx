import styles from "./petCat.module.css";

interface IPetCatItem {
  isMoving: boolean;
  catImg?: string;
}

export const PetCat = ({ isMoving, catImg }: IPetCatItem) => {
  return (
    <div>
      <div className={styles.petCatBox}>
        <div
          className={`${styles.petHand} ${isMoving ? styles.activePetHand : ""}`}
        >
          <img src="/petHand.png" alt="쓰다듬는 소온" />
        </div>
        <div className={`${styles.catImg} ${isMoving ? styles.squeshCat : ""}`}>
          <img src={catImg} alt="쓰다듬기 위한 굉이 사진" />
        </div>
      </div>
    </div>
  );
};
