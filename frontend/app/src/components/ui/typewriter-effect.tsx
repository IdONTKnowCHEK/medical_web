"use client";

import { motion} from "framer-motion";
import { cn } from "../../utils/utils";
import { TypewriterEffectProps } from "../../types/types";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex my-4", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 1.5,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-5 sm:h-6 md:h-9 lg:h-14 bg-blue-500 mt-1",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
