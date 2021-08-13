import React from "react";
import { MDBProgress } from 'mdbreact';

const ProgressBarPage = () => {
  return (
    <>
      <MDBProgress material value={0} className="my-s" />
      <MDBProgress material value={25} className="my-s" />
      <MDBProgress material value={50} className="my-s" />
      <MDBProgress material value={75} className="my-s" />
      <MDBProgress material value={100} className="my-s" />
    </>
  );
}

export default ProgressBarPage;