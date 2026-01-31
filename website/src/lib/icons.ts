import {
  PenTool,
  MessageSquare,
  Brain,
  Target,
  Sparkles,
  Award,
  BookOpen,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// Map icon names from CMS to Lucide React icons
export const iconMap: Record<string, LucideIcon> = {
  PenTool,
  MessageSquare,
  Brain,
  Target,
  Sparkles,
  Award,
  BookOpen,
  Users,
  Zap,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Award; // Default to Award icon if not found
}
