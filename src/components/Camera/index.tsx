import { UseCamera } from "../../hooks/useCamera";
import styles from "./camera.module.css";
function Camera() {
  const {
    error,
    isActive,
    permissionStatus,
    startCamera,
    stopCamera,
    stream,
    videoRef,
  } = UseCamera();

  return (
    <div className={styles.container}>
      <div className={styles.viewfinder}>
        <video
          ref={videoRef}
          autoPlay
          playsInline // Crucial for iOS
          muted
        />
      </div>
      <button onClick={startCamera}>Start Camera</button>
    </div>
  );
}

export default Camera;
