import CapturePage from "@/components/CapturePage";

export default function Transcript() {
  return (
    <CapturePage
      endpoint="/api/transcript"
      instruction="Make sure your image is clearly visible on the marked area"
    />
  );
}