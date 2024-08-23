import React from "react";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any; // Allows any other props to be passed down to the div element
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props} // Passes any other props down to the div element
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical, // Horizontal layout if vertical is false
          "flex-col": vertical, // Vertical layout if vertical is true
        },
        className, // Additional className passed from props
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical, // Horizontal animation class if vertical is false
              "animate-marquee-vertical flex-col": vertical, // Vertical animation class if vertical is true
              "group-hover:[animation-play-state:paused]": pauseOnHover, // Pauses animation on hover if pauseOnHover is true
              "[animation-direction:reverse]": reverse, // Reverses animation direction if reverse is true
            })}
          >
            {children} {/* Renders the children elements */}
          </div>
        ))}
    </div>
  );
}
