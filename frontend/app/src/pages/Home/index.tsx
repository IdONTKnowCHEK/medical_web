import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { useFormHandler } from "../../hooks/useFormHandler";
import { Typewriter } from "../../components/typewritter";
import { LoadingSkeleton } from "../../components/loadingSkeleton";
import { splitText } from "../../utils/splitText";

function HomePage() {
  // change here
  // words to be displayed in the typewriter effect
  // placeholders for the input field
  const words = `Clean the Medical Diagnosis`;
  const placeholders = [
    "Are there any diagnosis reports?",
    "What medical diagnosis is there?",
  ];


  const { showText, setInput, result, loading, handleChange, handleSubmit } = useFormHandler();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh">
        <div className="mx-auto">
          <TypewriterEffectSmooth words={splitText(words)} />
        </div>
        <div className="w-4/5">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            setInput={setInput}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <div className="max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto my-8 overflow-y-auto flex-col justify-items-end">
            {(loading || result) && (
              <div
                className="mb-5 p-4 bg-gray-900 shadow-md rounded-2xl break-words max-w-xl"
                style={{ display: 'inline-flex', justifyContent: 'flex-end', width: 'auto' }}
              >
                {showText}
              </div>
            )}
            {loading ? (
              <div className="min-w-full">
                <LoadingSkeleton />
              </div>
            ) : (
              <div className={"prose dark:prose-invert min-w-full"}>
                <Typewriter text={result} speed={5} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
