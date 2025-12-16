import { Twitch } from "lucide-react";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TwitchLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const TwitchLink = ({ className, ...rest }: TwitchLinkProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors text-sm",
        className,
      )}
      {...rest}
    >
      <Twitch className="w-4 h-4 text-purple-500" />
      <span className="text-foreground">ტვიტჩი</span>
    </a>
  );
};
