import { createContext, useCallback, useContext, useState } from 'react';

export interface ICatPhoto {
  name: string;
  url: string;
  isRotate: boolean;
}
const defaultCat: ICatPhoto = {
  name: '기본고양이',
  url: '/cat1.png',
  isRotate: false,
};
// 슬라이드 바에 기본 고양이 넣을 iterface를 넣음

interface ICatContextType {
  isMoving: boolean;
  catPhotos: ICatPhoto[];
  currentCat: string;
  setCatPhotos: React.Dispatch<React.SetStateAction<ICatPhoto[]>>;
  setCurrentCat: (url: string) => void;
  handlePetPet: () => void;
}

export const CatContext = createContext<ICatContextType | null>(null);

export const CatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [catPhotos, setCatPhotos] = useState<ICatPhoto[]>([defaultCat]);
  const [currentCat, setCurrentCat] = useState(defaultCat.url);

  const handlePetPet = useCallback(() => {
    if (!isMoving) {
      setIsMoving(true);

      setTimeout(() => {
        setIsMoving(false);
      }, 200);
    }
  }, [isMoving]);

  return (
    <CatContext.Provider
      value={{
        isMoving,
        catPhotos,
        currentCat,
        setCatPhotos,
        setCurrentCat,
        handlePetPet,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error('CatProvider 안에서 이걸 쓰고 있는지 다시 확인해봐...');
  }
  return context;
};
