import styles from './App.module.css';
import { PetCat } from './components/PetCat/petCat';
import { CatPhotoList } from './components/CatPhotoList/CatPhotoList';
import Btns from './components/Btns/Btns';
import { useCat } from './Hooks/catContext.tsx';
import { BgColorChanger } from './components/BgColorChanger/BgColorChanger.tsx';

function App() {
  const { bgColor } = useCat();

  return (
    <div
      className={styles.wapper}
      style={{ '--bgColor': `${bgColor}` } as React.CSSProperties}
    >
      <div className={styles.buttonContainer}>
        <Btns />
      </div>
      <div className={styles.PetCat}>
        <PetCat />
      </div>
      <div className={styles.listContainer}>
        <CatPhotoList />
      </div>
      <div className={styles.BgColorChanger}>
        <BgColorChanger />
      </div>
      <div className={styles.btn}>
        <a
          href="https://www.photoroom.com/ko/tools/background-remover?utm_source=google&utm_medium=search&utm_id=22934395320&utm_campaign=Web_Search_Generic_BAU_KO_ko_Maxconv&utm_content=772266067364&adset_name=Background-Removers&ad_name=NA&adset_id=184466647869&utm_term=%EB%88%84%EB%81%BC%20%EB%94%B0%EB%8A%94%20%EC%82%AC%EC%9D%B4%ED%8A%B8&matchtype=b&network=g&device=c&placement=&gad_source=1&gad_campaignid=22934395320&gbraid=0AAAAABrDMJjY8T5wL1zqknutC-aSdjbJa&gclid=CjwKCAiAqprNBhB6EiwAMe3yhpIKxxXhaHQ3YmedeX2muYSJHzEtClfNF1zQuc4Gd2pwVYzfLBYrNhoCpJoQAvD_BwE"
          target="_blank"
          rel="noopener noreferrer"
        >
          이미지 누끼따러 가기
        </a>
      </div>
    </div>
  );
}

export default App;
