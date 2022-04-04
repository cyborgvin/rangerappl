import React from 'react';
import Webcam from "react-webcam";
import { useRef } from 'react';
import { useEffect } from 'react';

const Camera = () => {

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};

ReactDOM.render(<Camera />, document.getElementById("root"));

// https://www.npmjs.com/package/react-webcam