import CapturePage from "@/components/CapturePage";

export default function PassiveLiveness() {
  return (
    <CapturePage
      endpoint="/api/passive-liveness"
      instruction="Make sure your face is clearly visible"
    />
  );
}