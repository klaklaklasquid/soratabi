import { useState } from "react";

function TextWithToggle({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const preview = text.substring(0, 150);
  const isLong = text.length > 150;

  return (
    <p className="leading-relaxed md:col-span-2">
      {expanded ? text : preview}
      {isLong && (
        <span
          onClick={() => setExpanded(!expanded)}
          className="ml-1 cursor-pointer font-semibold text-blue-500"
        >
          {expanded ? "See less" : "... See more"}
        </span>
      )}
    </p>
  );
}

export default TextWithToggle;
