import { useState } from "react";

const Viewer = ({ count }) => {
  return (
    <>
      <div>현재 카운트:</div>
      <div>
        <h1>{count}</h1>
      </div>
    </>
  );
};

export default Viewer;
