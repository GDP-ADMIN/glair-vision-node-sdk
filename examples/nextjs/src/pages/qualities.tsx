import CapturePage from "@/components/CapturePage";

export default function Qualities() {
  return (
    <CapturePage
      endpoint="/api/qualities"
      instruction="Make sure your image is clearly visible on the marked area"
    />
  );
}