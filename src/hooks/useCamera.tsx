import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export type PermissionStatus = "granted" | "denied" | "prompt" | "error";
type CameraFacing = "user" | "enviornment";
interface UseCamera {
  videoRef: RefObject<HTMLVideoElement | null>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  //   takePhoto: () => string | null;
  isActive: boolean;
  error: string | null;
  permissionStatus: PermissionStatus;
  stream: MediaStream | null;
}
export const UseCamera = (): UseCamera => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraFacing, _] = useState<CameraFacing>("enviornment");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("prompt");

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: { ideal: cameraFacing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsActive(true);
      setPermissionStatus("granted");
    } catch (err: any) {
      console.error("Camera Access Error:", err);
      setIsActive(false);
      setStream(null);

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setError(
          "Camera permission denied. Please allow access in your browser settings."
        );
        setPermissionStatus("denied");
      } else if (err.name === "NotFoundError") {
        setError("No camera device found.");
        setPermissionStatus("error");
      } else {
        setError(
          "Unable to access camera: " + (err.message || "Unknown error")
        );
        setPermissionStatus("error");
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    videoRef,
    startCamera,
    stopCamera,
    isActive,
    error,
    permissionStatus,
    stream,
  };
};
