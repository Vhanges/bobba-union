"use client";

import * as React from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * `prism-react-renderer` ships a small set of languages in its core bundle.
 * Anything outside that list would throw, so normalise to a known-good value
 * and let the highlighter fall back to plain text.
 */
const KNOWN_LANGUAGES = new Set<string>([
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "diff",
  "go",
  "graphql",
  "ini",
  "java",
  "javascript",
  "json",
  "jsx",
  "kotlin",
  "less",
  "lua",
  "makefile",
  "markdown",
  "objectivec",
  "perl",
  "php",
  "python",
  "r",
  "ruby",
  "rust",
  "scss",
  "sql",
  "swift",
  "tsx",
  "typescript",
  "wasm",
  "yaml",
]);

function normalizeLanguage(language?: string): Language | "text" {
  if (!language) return "text";
  const lower = language.toLowerCase();
  if (KNOWN_LANGUAGES.has(lower)) return lower as Language;
  return "text";
}

/** Human readable label for the language badge. */
function languageLabel(language?: string): string {
  if (!language || language.toLowerCase() === "text") return "";
  const aliases: Record<string, string> = {
    js: "JavaScript",
    ts: "TypeScript",
    jsx: "JSX",
    tsx: "TSX",
    sh: "Shell",
    bash: "Bash",
    zsh: "Shell",
    py: "Python",
    rb: "Ruby",
    yml: "YAML",
    md: "Markdown",
    objc: "Objective-C",
    "c++": "C++",
  };
  const lower = language.toLowerCase();
  if (aliases[lower]) return aliases[lower];
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function CodeBlock({
  code,
  language,
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions or an insecure context.
      setCopied(false);
    }
  }, [code]);

  const label = languageLabel(language);

  return (
    <div
      data-slot="chat-code-block"
      className={cn(
        "group/code relative overflow-hidden rounded-lg bg-[#1b1b1b] text-[#e6e6e6] ring-1 ring-black/10",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-1.5">
        <span className="font-mono text-[0.7rem] tracking-wide text-white/45">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          data-copied={copied}
          className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[0.7rem] text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
          <span className="sr-only sm:not-sr-only">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      <Highlight
        theme={themes.vsDark}
        code={code.replace(/\n$/, "")}
        language={normalizeLanguage(language)}
      >
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              preClassName,
              "max-h-80 overflow-x-auto p-3 text-[0.8rem] leading-relaxed"
            )}
            style={{ ...style, background: "transparent", margin: 0 }}
          >
            <code className="font-mono">
              {tokens.map((line, i) => (
                <span
                  key={i}
                  {...getLineProps({ line })}
                  className="block"
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default CodeBlock;
