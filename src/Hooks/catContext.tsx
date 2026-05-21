import React, { createContext, useCallback, useContext, useState } from 'react';

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
  isBgChangeShow: boolean;
  setIsBgChangeShow: React.Dispatch<React.SetStateAction<boolean>>;
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  ALotOfPalm: number;
  setALotOfPalm: React.Dispatch<React.SetStateAction<number>>;
}

export const CatContext = createContext<ICatContextType | null>(null);

export const CatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isBgChangeShow, setIsBgChangeShow] = useState(false);

  const [catPhotos, setCatPhotos] = useState<ICatPhoto[]>([defaultCat]);
  const [currentCat, setCurrentCat] = useState(defaultCat.url);
  const [bgColor, setBgColor] = useState('#a9ffb4');
  const [ALotOfPalm, setALotOfPalm] = useState(1);

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
        isBgChangeShow,
        setIsBgChangeShow,
        bgColor,
        setBgColor,
        ALotOfPalm,
        setALotOfPalm,
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
