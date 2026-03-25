import { Composition } from "remotion";
import { CaptionedVideo } from "./CaptionedVideo";
import { DesignShowcase } from "./DesignShowcase";

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
    </>
  );
};
