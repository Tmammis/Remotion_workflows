import { Composition } from "remotion";
import { CaptionedVideo } from "./CaptionedVideo";
import { DesignShowcase } from "./DesignShowcase";
import { ElevenLabsShowcase } from "./ElevenLabsShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        durationInFrames={1673}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DesignShowcase"
        component={DesignShowcase}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ElevenLabsShowcase"
        component={ElevenLabsShowcase}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
