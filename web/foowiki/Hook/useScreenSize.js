// hooks/useScreenSize.js

import { useState, useEffect,useReducer } from 'react';
import {act} from "react-dom/test-utils";

const useScreenSize = () => {
  const [screenSize, dispatch] = useReducer(
      (state,action) => ({...state,...action}),
      {width:0,height:0}
  )

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };

    // 初始化时获取一次屏幕尺寸
    handleResize();

    // 添加窗口大小变化事件监听器
    //window.addEventListener('resize', handleResize);

    // 在组件卸载时清除事件监听器，防止内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 传递空数组作为依赖项，确保只在组件挂载和卸载时执行

  return screenSize;
};

export default useScreenSize;
