import { LoaderCircle } from "lucide-react";
import React from "react";

const CircleLoading = ({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return <LoaderCircle className={`animate-spin ${className}`} size={size} />;
};

export default CircleLoading;
