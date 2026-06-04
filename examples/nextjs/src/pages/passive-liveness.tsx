import CapturePage from "@/components/CapturePage";

export default function PassiveLiveness() {
  return (
    <CapturePage
      endpoint="/api/pl"
      instruction="Make sure your face is clearly visible"
    />
  );
}