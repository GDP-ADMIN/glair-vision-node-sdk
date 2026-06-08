import { GlairWebcamElmt } from "@/components/types";
import Link from "next/link";
import { useRef, useState } from "react";
import "@glair/web-components/lib/webcam";

type CapturePageProps = {
  endpoint: string;
  instruction: string;
  webcamOverlay?: React.ReactNode;
  buildFormData?: (formData: FormData) => void;
};

export default function CapturePage({
  endpoint,
  instruction,
  webcamOverlay,
  buildFormData,
}: CapturePageProps) {
  const webcam = useRef<GlairWebcamElmt>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!webcam.current || !webcam.current.screenshot) return;

    try {
      setLoading(true);
      setError(null);

      const base64Sshot = await webcam.current.screenshot();
      const fetchSshot = await fetch(base64Sshot);
      const blob = await fetchSshot.blob();

      const formData = new FormData();
      formData.append("image", blob);
      buildFormData?.(formData);

      const resp = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        const errorBody = await resp.json();
        throw new Error(JSON.stringify(errorBody));
      }

      setResult(await resp.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <Container>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <pre className="text-red-500">{error}</pre>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto w-[300px]">
        <div className="h-[300px] text-gray-700">
          <glair-webcam ref={webcam} width={300} height={300} mirrored>
            {webcamOverlay}
          </glair-webcam>
        </div>

        <div className="flex flex-col items-center bg-gray-700 p-3 text-center text-white">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="mb-3 text-lg font-bold">Take photo</p>

              <button
                className="h-[50px] w-[50px] cursor-pointer rounded-full border-2 border-white bg-red-500"
                onClick={handleClick}
              />

              <p className="mt-3">{instruction}</p>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

type Props = {
  children?: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link
          href="/"
          className="rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Back
        </Link>
      </div>

      {children}
    </main>
  );
}
