import { useEffect } from 'react';

const DisableScroll = ({screenSize,changeSize}) => {
  useEffect(() => {
    // 禁用滚动
    if(screenSize<=changeSize)document.body.style.overflow = 'hidden';

    // 在组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // 空数组表示只在组件挂载和卸载时运行

  return null;
};

export default DisableScroll;
