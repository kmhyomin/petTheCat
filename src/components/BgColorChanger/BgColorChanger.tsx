import { ChromePicker, CirclePicker } from 'react-color';
import { useCat } from '../../Hooks/catContext.tsx';
import useIsMobile from '../../Hooks/useIsMobile.tsx';

export const BgColorChanger = () => {
  const { isBgChangeShow, bgColor, setBgColor } = useCat();
  const isMoblie = useIsMobile();
  if (!isBgChangeShow) return null;

  const colorChanger = (color: any) => {
    setBgColor(color.hex);
  };

  return (
    <>
      {isMoblie ? (
        <div>
          <CirclePicker color={bgColor} onChange={colorChanger} />
        </div>
      ) : (
        <div>
          <ChromePicker color={bgColor} onChange={colorChanger} />
        </div>
      )}
    </>
  );
};
