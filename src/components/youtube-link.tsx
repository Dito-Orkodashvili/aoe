import { Youtube } from "lucide-react";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type YoutubeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const YoutubeLink = ({ className, ...rest }: YoutubeLinkProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors text-sm",
        className,
      )}
      {...rest}
    >
      <Youtube className="w-4 h-4 text-red-500" />
      <span className="text-foreground">იუთუბი</span>
    </a>
  );
};
