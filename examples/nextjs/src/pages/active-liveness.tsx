import CapturePage from "@/components/CapturePage";
import HAND_01100 from "@/../public/active-liveness/ic_HAND_01100_white.svg";

export default function ActiveLiveness() {
  return (
    <CapturePage
      endpoint="/api/al"
      instruction="Make sure your face is clearly visible on the marked area"
      buildFormData={(formData) => {
        formData.append("gestureCode", "HAND_01100");
      }}
      webcamOverlay={
        <div
          slot="user-media"
          style={{
            position: "absolute",
            top: "15%",
          }}
        >
          <img src={HAND_01100.src} />
        </div>
      }
    />
  );
}