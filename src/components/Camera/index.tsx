import { UseCamera } from "../../hooks/useCamera";
import styles from "./camera.module.css";
function Camera() {
  const { error, isActive, startCamera, stopCamera, videoRef } = UseCamera();

  return (
    <div className={styles.container}>
      <div className={styles.viewfinder}>
        <video
          ref={videoRef}
          autoPlay
          playsInline // Crucial for iOS
          muted
        />
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
