import { useState } from "react";
import { UseCamera } from "../../hooks/useCamera";
import styles from "./camera.module.css";
function Camera() {
  const { error, isActive, startCamera, stopCamera, videoRef } = UseCamera();
  const [image, setImage] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for the file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Optional: If camera is running, stop it when uploading a file to save battery
      if (isActive) stopCamera();
    }
  };
  return (
    <div className={styles.container}>
      <input
        type="file"
        title="Upload Image"
        onChange={(e) => handleFileChange(e)}
      />
      <div className={styles.viewfinder}>
        <video
          ref={videoRef}
          autoPlay
          playsInline // Crucial for iOS
          muted
        />
        {image && <img src={image} />}
        {error && <div className="error-msg">{error}</div>}
      </div>

      {!isActive ? (
        <button className="btn-start" onClick={startCamera}>
          Start Camera
        </button>
      ) : (
        <>
          <button className="btn-stop" onClick={stopCamera}>
            Stop
          </button>
        </>
      )}
    </div>
  );
}

export default Camera;
