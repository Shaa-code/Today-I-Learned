"use client"; //Server, Client 모두 대응하기 위해 Client Component로 설정해줘야한다.

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
