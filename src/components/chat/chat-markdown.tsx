"use client";

import * as React from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/chat/code-block";

type CodeElementProps = {
  className?: string;
  children?: React.ReactNode;
};

const components: Partial<Components> = {
  /**
   * Block code arrives as `<pre><code class="language-x">`. We replace the whole
   * `<pre>` with the highlighted container. Inline code is styled by the
   * arbitrary variants on the wrapper below, so it never reaches this path.
   */
  pre({ children }) {
    const child = React.Children.only(children) as React.ReactElement<CodeElementProps>;
    const className = child?.props?.className ?? "";
    const language = /language-([\w-]+)/.exec(className)?.[1];
    const code = String(child?.props?.children ?? "").replace(/\n$/, "");

    return <CodeBlock code={code} language={language} />;
  },

  /** Tables can overflow a narrow chat panel, so give them their own scroller. */
  table({ children }) {
    return (
      <div className="scrollbar-thin -mx-1 overflow-x-auto px-1">
        <table>{children}</table>
      </div>
    );
  },

  a({ children, href }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline decoration-current/40 underline-offset-2 transition-colors hover:decoration-current"
      >
        {children}
      </a>
    );
  },
};

export function ChatMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      data-slot="chat-markdown"
      className={cn(
        "flex min-w-0 flex-col gap-2 text-sm leading-relaxed",
        // Flow content keeps its natural margins; only the first/last child is
        // collapsed so the bubble padding does not look uneven.
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        // Inline code (block code is replaced by the `pre` override above).
        "[&_code]:rounded [&_code]:bg-current/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]",
        "[&_pre]:m-0",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-current/25 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:opacity-85",
        "[&_h1]:text-base [&_h1]:font-semibold [&_h1]:tracking-tight",
        "[&_h2]:text-[0.95rem] [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:text-sm [&_h3]:font-semibold",
        "[&_h4]:text-sm [&_h4]:font-semibold [&_h4]:opacity-90",
        "[&_hr]:my-1 [&_hr]:border-current/15",
        "[&_li]:my-1 [&_li]:ps-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5",
        "[&_li>p]:my-0",
        // GFM task lists: hide the default marker and style the checkbox inline.
        "[&_ul:has(>li>input[type=checkbox])]:list-none [&_ul:has(>li>input[type=checkbox])]:pl-1",
        "[&_li>input[type=checkbox]]:mr-1.5 [&_li>input[type=checkbox]]:align-middle [&_li>input[type=checkbox]]:accent-current",
        "[&_strong]:font-semibold",
        "[&_em]:italic",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.9em]",
        "[&_td]:border [&_td]:border-current/15 [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top",
        "[&_th]:border [&_th]:border-current/15 [&_th]:bg-current/5 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold",
        "[&_img]:max-w-full [&_img]:rounded-lg",
        className
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </Markdown>
    </div>
  );
}

export default ChatMarkdown;
