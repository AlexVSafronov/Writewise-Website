import { Layout } from "@/components/layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const testMarkdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4

This is a paragraph with **bold text**, *italic text*, and ***bold italic text***.

You can also use __bold__ and _italic_ with underscores.

Here's some ~~strikethrough text~~.

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

### Task List
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Links and Images

Here's a [link to WriteWise](https://write-wise.com).

Here's an internal [link to blog](/blog).

![Placeholder image](https://via.placeholder.com/800x400/6366f1/ffffff?text=Test+Image)

## Code

Inline code: \`const level = "B2"\`

Code block:
\`\`\`javascript
function assessLevel(score) {
  if (score > 80) return 'B2';
  if (score > 60) return 'B1';
  return 'A2';
}
\`\`\`

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> **Important:** This is a bold text inside a blockquote.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Table with Alignment

| Left | Center | Right |
|:-----|:------:|------:|
| A1   | B1     | C1    |
| A2   | B2     | C2    |

### Table with Formatting

| Feature | Free | Pro |
|---------|------|-----|
| Tasks | **3/day** | **Unlimited** |
| AI | *Basic* | *Advanced* |
| Price | €0 | [€9.99](/pricing) |

## Horizontal Rule

---

## Mixed Content

Here's a paragraph with **bold**, *italic*, \`code\`, and a [link](/about).

- List item with **bold**
- List item with *italic*
- List item with \`code\`
- List item with [link](/pricing)

> Quote with **bold text** and *italic text*

---

**End of test content**
`;

const MarkdownTest = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-lg bg-primary/10 p-6">
              <h1 className="mb-2 text-2xl font-bold text-foreground">
                Markdown Rendering Test
              </h1>
              <p className="text-muted-foreground">
                This page tests all supported Markdown elements to verify frontend rendering.
              </p>
            </div>

            <article
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:underline prose-a:font-medium hover:prose-a:text-primary/80
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-foreground prose-em:italic
                prose-ul:text-muted-foreground prose-ul:my-6 prose-ul:space-y-2
                prose-ol:text-muted-foreground prose-ol:my-6 prose-ol:space-y-2
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6
                prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:text-foreground prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-img:w-full
                prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:mt-2
                prose-table:text-muted-foreground prose-table:border-collapse prose-table:w-full
                prose-thead:border-b prose-thead:border-border
                prose-th:text-foreground prose-th:font-semibold prose-th:p-3 prose-th:text-left
                prose-td:p-3 prose-td:border-b prose-td:border-border"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {testMarkdown}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MarkdownTest;
