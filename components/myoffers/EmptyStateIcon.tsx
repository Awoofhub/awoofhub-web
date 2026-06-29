import { Tag, Zap, Clock, XCircle, Ban, Hourglass } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  tag: Tag,
  lightning: Zap,
  clock: Clock,
  "x-circle": XCircle,
  "no-entry": Ban,
  hourglass: Hourglass,
};

interface Props {
  icon: string;
}

export default function EmptyStateIcon({ icon }: Props) {
  const Icon = ICONS[icon] ?? Tag;
  return <Icon className="text-primary" size={28} />;
}