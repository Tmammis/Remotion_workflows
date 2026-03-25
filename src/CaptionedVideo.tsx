import React from "react";
import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import captionsData from "./captions.json";

const { fontFamily } = loadFont();

interface Word {
  text: string;
  start: number;
  end: number;
}

const words: Word[] = captionsData as Word[];
const WORDS_PER_CHUNK = 4;

function cleanWord(text: string): string {
  return text.replace(/[.,]+$/, "");
}

function getChunks(words: Word[]): Word[][] {
  const chunks: Word[][] = [];
  for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
    chunks.push(words.slice(i, i + WORDS_PER_CHUNK));
  }
  return chunks;
}

export const CaptionedVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const chunks = getChunks(words);

  const activeChunk = chunks.find((chunk) => {
    const chunkStart = chunk[0].start;
    const chunkEnd = chunk[chunk.length - 1].end;
    return currentTime >= chunkStart && currentTime <= chunkEnd;
  });

  return (
    <AbsoluteFill>
      {/* Video with original audio */}
      <Video src={staticFile("video.mp4")} />

      {/* Gradient overlay at bottom */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Captions */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        {activeChunk && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 24,
              fontFamily,
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "0.02em",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            {activeChunk.map((word, i) => {
              const isCurrent =
                currentTime >= word.start && currentTime <= word.end;
              const isPast = currentTime > word.end;

              let color = "rgba(255,255,255,0.5)"; // future — primary at 50%
              let textShadowExtra = "";
              let transform = "scale(1)";

              if (isCurrent) {
                color = "#2CB262"; // accent green
                textShadowExtra =
                  ", 0 4px 40px rgba(44,178,98,0.8)";
                transform = "scale(1.1)";
              } else if (isPast) {
                color = "#FFFFFF"; // primary white
              }

              return (
                <span
                  key={`${word.start}-${i}`}
                  style={{
                    color,
                    textShadow: `0 4px 20px rgba(0,0,0,0.8)${textShadowExtra}`,
                    transform,
                    display: "inline-block",
                    transition: "all 0.1s ease",
                  }}
                >
                  {cleanWord(word.text)}
                </span>
              );
            })}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
