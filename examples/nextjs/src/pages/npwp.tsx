import CapturePage from "@/components/CapturePage";

export default function Npwp() {
  return (
    <CapturePage
      endpoint="/api/npwp"
      instruction="Make sure your NPWP is clearly visible on the marked area"
    />
  );
}
