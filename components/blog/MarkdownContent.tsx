import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-light prose-headings:text-ink prose-p:text-ink-secondary prose-p:leading-relaxed prose-a:text-primary-mid prose-strong:text-ink prose-li:text-ink-secondary ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
