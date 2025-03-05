import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    return () => {
      //클린업, 정리함수
      console.log("unmount");
    };
  }, []);

  return <div>짝수입니다.</div>;
};

export default Even;
