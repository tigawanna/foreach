import { useNProgress } from "@tanem/react-nprogress";
import { ReactNode } from "react";

interface ReactProgressProps {
  isAnimating: boolean;
}

export const ReactProgress = ({ isAnimating }: ReactProgressProps) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      {/*
      This example doesn't use a spinner component so the UI stays
      tidy. You're free to render whatever is appropriate for your
      use-case.
      */}
    </Container>
  );
};

interface ContainerProps {
  animationDuration: number;
  isFinished: boolean;
  children: ReactNode;
}

const Container = ({
  animationDuration,
  children,
  isFinished,
}: ContainerProps) => (
  <div
    // className="relative top-0 "
    
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: "none",
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

interface BarProps {
  animationDuration: number;
  progress: number;
}

const Bar = ({ animationDuration, progress }: BarProps) => (
  <div
    style={{
      background: "var(--accent-color)",
      height: 5,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: "absolute",
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: "100%",
      zIndex: 1031,
    }}
  >

  </div>
);
