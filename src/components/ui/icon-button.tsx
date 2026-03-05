import React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
  title: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Accessible icon button component that wraps icon components with proper
 * aria-label, title (tooltip), and consistent sizing/styling.
 *
 * Features:
 * - Screen reader support with aria-label
 * - Tooltip via title attribute
 * - Visible focus ring for keyboard navigation
 * - Consistent hover/focus states in light and dark modes
 * - Support for different variants (default, danger)
 */
export function IconButton({
  Icon,
  ariaLabel,
  title,
  onClick,
  variant = "default",
  disabled = false,
  size = "md",
}: IconButtonProps) {
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    default:
      "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800",
    danger:
      "text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:text-inherit hover:bg-transparent"
    : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className={cn(
        "rounded transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "dark:focus:ring-offset-zinc-900",
        sizeClasses[size],
        variantClasses[variant],
        disabledClasses
      )}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
}