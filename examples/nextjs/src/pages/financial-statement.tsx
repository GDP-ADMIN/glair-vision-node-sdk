import CapturePage from "@/components/CapturePage";

export default function FinancialStatement() {
  return (
    <CapturePage
      endpoint="/api/financial-statement"
      instruction="Make sure your financial statement is clearly visible on the marked area"
    />
  );
}