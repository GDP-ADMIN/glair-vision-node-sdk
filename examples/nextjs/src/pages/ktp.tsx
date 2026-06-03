import CapturePage from "@/components/CapturePage";

export default function Ktp() {
  return (
    <CapturePage
      endpoint="/api/ktp"
      instruction="Make sure your e-KTP is clearly visible on the marked area"
    />
  );
}