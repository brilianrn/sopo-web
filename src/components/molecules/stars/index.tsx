import { Star } from "lucide-react";
import { FC } from "react";
import { StarsProps } from "./stars";

export const Stars: FC<StarsProps> = ({ count }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400" />
      ))}
    {Array(5 - count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4" />
      ))}
  </div>
);
