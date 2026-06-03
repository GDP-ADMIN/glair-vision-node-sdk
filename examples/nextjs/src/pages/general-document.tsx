import CapturePage from "@/components/CapturePage";

export default function GeneralDocument() {
  return (
    <CapturePage
      endpoint="/api/general-document"
      instruction="Make sure your document is clearly visible on the marked area"
    />
  );
}