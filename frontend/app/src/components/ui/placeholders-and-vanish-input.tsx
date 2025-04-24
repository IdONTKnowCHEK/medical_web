"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/utils";
import { button } from "framer-motion/client";

export function PlaceholdersAndVanishInput({
  placeholders,
  setInput,
  onChange,
  onSubmit
}: {
  placeholders: string[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {


  const example = [
    `Dear Dr: This 49 y/o male was a case of R-S colon cancer obsrtruction /c liver metastasis. This time, he suffered from right thigh spasm pain off and on despite pain-killer for one week, so he came to our ER and underwent CT. CT :Numerous liver metastasis,metastatic lymphadenopathy at lesser sac and aortoportal region. He was then admitted for further management.Due to,back pain ,Right thigh pain,hip joint pain were complained.We need your special experience to evaluation this condition for pain control.Thanks!`,
    `Dear doctor, The 13-year-old boy is a case of 1. ALL, precursor T-lymphoblastic leukemia, s/p TPOG-ALL-2013 SR since 2015/8/25, bilateral testis relapse s/p RT 2017/09, bone marrow relapse (Blast 90%) on 2017/10/2, s/p TPOG-ALL-2013 VHR since 2017/10/12. 2. Left side scortum swelling mass, suspected left testis tumor, s/p left orchiectomy on 2018/1/31. This time, he was admitted on 3/10 due to fever with hyperleukocytosis up to 178300/μL. We arrange chemotherapy since 3/12 and his WBC count has dropped to 170/μL today. During hospiotalization, he had headache and elevated systolic blood pressure up to 150mmHg on 03/15-03/16. He exhibited seizures, GTCs on 03/17 morning and he underwent brain MRI on 03/19 which disclosed Posterior reversible encephalopathy syndrome (PRES). We used morphine 2.5mg IV PRN or Q8H, and the patient comlained weakness or urine retention sometimes.  Therefore, we need your expertise to evaluate the patient's pain condition and help us adjust his pain control medication. Thank you very much!`,
    `Dear doctor, this is an 80y/o woman with (1) REcurrence Cellulitis with lymphedema(2) Ovarian CA,right stage IIIC s/p debulking and C/T in 2009 at CMUH. (3) CKD, stage 5 (4)HTN (5)Compression fracture at T11, L1, s/p kyphoplasty on 2010 (6) Infrarenal inferior venacava chronic occlusion with collateral vessel (7)Suspected CAD (8) right renal stine s/p right nephrectomy (9)Herpez zoster 5 y/o s/p medication 
This time, she had severe right rib area 7th-8th pain and upper back pain for 10days. Right leg edema 2+ with mild pain was also noted for 2 days. No trauma history was noted. Poor renal function of BUN/Creat:43/1.64 was also noted. Severe Osteoporosis and suspected T-L spine Compression fracture s/p op was noted from X ray.  She ever went to pain control OPD twice for help and pain control medication was given, but symptoms persisted, so she was transferred to our ER and was admitted. We sincerely asked for your expertise for the pain control strategy, thank you!`
  ]
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState("");
  const hasMultipleLines = () => {
    const textarea = inputRef.current;
    return textarea ? textarea.scrollHeight > 24 : false;
  };
  useEffect(() => {
    adjustHeight();
  }, [value]);

  const adjustHeight = () => {
    const textarea = inputRef.current;
    const form = formRef.current;
    const button = btnRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      if (form && button) {
        if (textarea.scrollHeight > 24) {
          button.style.bottom = `0`;
          button.style.top = `auto`;
          form.style.borderRadius = '1.5rem';
          textarea.style.marginBottom = `1.5rem`;
          textarea.style.paddingBottom = `auto`;
          console.log("more")
        } else {
          button.style.bottom = `auto`;
          button.style.top = `50%`;
          form.style.borderRadius = '9999px';
          textarea.style.marginBottom = `auto`;
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim() !== "") {
      if (!e.shiftKey) {
        e.preventDefault();
        const formElement = inputRef.current?.form;
        if (formElement) {
          formElement.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
          setValue(""); // Clear the input field after submission
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    setInput("");
    onSubmit && onSubmit(e);
  };

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  return (
    <form
      className={cn(
        "w-full relative h-auto rounded-full min-h-14 max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto bg-white dark:bg-zinc-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        value && "bg-gray-50"
      )}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <textarea
        rows={1}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e);
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        className={cn(
          "w-[86%] sm:w-[91%] lg:w-[94%] text-sm h-auto relative pb-0 top-[15px] max-h-80 sm:text-base z-50 border-none dark:text-white bg-transparent text-black focus:outline-none focus:ring-0 pl-4 pr-1 sm:pl-6 resize-none"
        )}
      />
      <button
        type='button'
        onClick={() => {
          const randomNumber = getRandomInt(0, 2);
          setValue(example[randomNumber]);
          setInput(example[randomNumber]);
        }}
        className={`absolute right-10 sm:right-14 transform -translate-y-1/2 text-sm sm:border-x-2 
          border-white hover:bg-gray-500 text-white py-1 px-2 rounded-full z-50 top-1/2
          ${value.length > 0 ? "hidden" : "block"}`}
      >
        <span className="hidden sm:block">Try Example</span>
        <svg className="block sm:hidden w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z" clip-rule="evenodd" />
        </svg>


      </button>

      <button
        disabled={!value}
        type="submit"
        ref={btnRef}
        className={`absolute right-3 z-50 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center`}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-7 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
