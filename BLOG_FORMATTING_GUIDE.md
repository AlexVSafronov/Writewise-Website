# WriteWise Blog Formatting Guide

This guide explains all the rich text formatting features available when creating blog posts in the Strapi CMS.

## Available Formatting Options

### Headers
Use headers to organize your content hierarchically:

```
# Heading 1 (H1) - Use for main title (automatic from post title)
## Heading 2 (H2) - Use for main sections
### Heading 3 (H3) - Use for subsections
#### Heading 4 (H4) - Use for minor subsections
```

**When to use:**
- H2 for major sections (e.g., "Why Online Tests Matter")
- H3 for subsections (e.g., "Advantages of Digital Testing")
- H4 for minor points

### Text Styling

**Bold Text** - Use for emphasis on important terms, product names, or key concepts
```html
<strong>Goethe Institute</strong>
<b>Important concept</b>
```

*Italic Text* - Use for subtle emphasis, foreign words, or book/article titles
```html
<em>zeitgeist</em>
<i>The Art of Learning</i>
```

***Bold + Italic*** - Use sparingly for maximum emphasis
```html
<strong><em>Critical point</em></strong>
```

### Links

Internal links (to other pages on your site):
```html
<a href="/blog/another-post">Read more about grammar tips</a>
```

External links (to other websites):
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External Resource</a>
```

**Best practices:**
- Use descriptive anchor text (not "click here")
- External links should open in new tabs
- Link to relevant resources to add value

### Lists

**Bulleted Lists** - Use for unordered items:
```html
<ul>
  <li>First advantage: accessibility</li>
  <li>Second advantage: instant feedback</li>
  <li>Third advantage: adaptive difficulty</li>
</ul>
```

**Numbered Lists** - Use for sequential steps or ranked items:
```html
<ol>
  <li>Take the initial assessment</li>
  <li>Review your results</li>
  <li>Create a study plan</li>
</ol>
```

### Images

Images automatically support:
- **Alt text** - Important for SEO and accessibility
- **Captions** - Use `<figcaption>` for image descriptions
- **Lazy loading** - Images load as user scrolls
- **Responsive sizing** - Auto-adjusts to screen size

**Best practices for images:**
1. Always add descriptive alt text
2. Use high-quality images (1200x600px for featured, 800x600px for inline)
3. Optimize file size (use JPG for photos, PNG for graphics)
4. Add captions when context is needed

Example with figure and caption:
```html
<figure>
  <img src="/uploads/test-screenshot.jpg" alt="Deutsche Welle placement test results showing B1 level">
  <figcaption>Screenshot of DW test results</figcaption>
</figure>
```

### Blockquotes

Use for:
- Important callouts
- Quotes from experts
- Spoiler alerts
- Key takeaways

```html
<blockquote>
  <p>Spoiler Alert: Not all placement tests give consistent results!</p>
</blockquote>
```

### Code Blocks

Inline code:
```html
Use the <code>CEFR scale</code> for assessment
```

Code blocks (for longer code):
```html
<pre><code>
function assessLevel(score) {
  return score > 80 ? 'B2' : 'B1';
}
</code></pre>
```

### Tables

Use tables for comparisons, pricing, or structured data:

```html
<table>
  <thead>
    <tr>
      <th>Test Provider</th>
      <th>Cost</th>
      <th>Duration</th>
      <th>Level Range</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Goethe Institute</td>
      <td>Free</td>
      <td>15 min</td>
      <td>A1-C2</td>
    </tr>
    <tr>
      <td>Deutsche Welle</td>
      <td>Free</td>
      <td>30 min</td>
      <td>A1-C1</td>
    </tr>
  </tbody>
</table>
```

## SEO Best Practices

### Image SEO
1. **Alt text** - Describe what's in the image
   - Good: "Student taking online German placement test on laptop"
   - Bad: "image1.jpg" or "test"

2. **File names** - Use descriptive names before uploading
   - Good: `german-test-screenshot.jpg`
   - Bad: `IMG_1234.jpg`

3. **Image size** - Optimize for web
   - Featured images: 1200x600px (2:1 ratio)
   - Inline images: 800x600px or smaller
   - Keep file size under 200KB when possible

### Content Structure
1. **One H1 per page** - Your post title (automatic)
2. **Use H2/H3 hierarchy** - Don't skip levels (H2 → H4)
3. **Short paragraphs** - 2-4 sentences max for readability
4. **Link to relevant content** - Internal and external links add value
5. **Use descriptive link text** - Tell readers where the link goes

### Writing Tips
1. **Front-load important info** - Key points in first paragraph
2. **Use active voice** - "WriteWise provides feedback" not "Feedback is provided by WriteWise"
3. **Break up text** - Use lists, images, blockquotes for visual variety
4. **Add value** - Every paragraph should teach something or move the story forward

## Strapi Rich Text Editor Tips

### Toolbar Buttons
The Strapi editor provides these formatting options:
- **B** - Bold
- *I* - Italic
- Link icon - Insert/edit links
- Image icon - Insert images
- List icons - Bulleted/numbered lists
- Quote icon - Blockquotes
- Code icon - Inline code or code blocks
- Heading dropdown - H2, H3, H4 options

### Keyboard Shortcuts
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + K` - Insert link
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

### Paste Content
When pasting from Word or Google Docs:
1. Use "Paste as Plain Text" option if available
2. Or paste, then reformat using the toolbar
3. Always preview before publishing

## Example: Well-Formatted Blog Post

```html
<h2>Why Online Placement Tests Matter</h2>

<p>Choosing the right <strong>CEFR level</strong> for your language studies is crucial. Online placement tests provide a <em>convenient and accurate</em> way to assess your current abilities.</p>

<figure>
  <img src="/uploads/cefr-levels.jpg" alt="CEFR language proficiency levels chart showing A1 through C2" loading="lazy">
  <figcaption>The CEFR framework includes six proficiency levels</figcaption>
</figure>

<h3>Top Free Placement Tests</h3>

<p>Here are the most reliable free options:</p>

<ul>
  <li><strong>Goethe Institute</strong> - Comprehensive test covering all skills</li>
  <li><strong>Deutsche Welle</strong> - Quick assessment with instant results</li>
  <li><strong>GLS Berlin</strong> - Focus on practical communication skills</li>
</ul>

<blockquote>
  <p>Spoiler Alert: Test results can vary between providers!</p>
</blockquote>

<p>For more details, check out our guide on <a href="/blog/how-to-test-your-german-level">how to test your German level</a>.</p>

<h3>Advantages of Digital Testing</h3>

<ol>
  <li>Instant feedback on your performance</li>
  <li>Adaptive difficulty based on your answers</li>
  <li>Detailed breakdown by skill area</li>
</ol>

<p>Start with the <a href="https://www.dw.com/de/deutsch-lernen/einstufungstest/s-32523" target="_blank" rel="noopener noreferrer">Deutsche Welle placement test</a> to get your baseline level.</p>
```

## Common Mistakes to Avoid

❌ **Don't:**
- Use multiple H1 headers
- Skip heading levels (H2 → H4)
- Use "click here" as link text
- Forget alt text on images
- Create walls of text without breaks
- Use all caps for emphasis
- Overuse bold and italic formatting

✅ **Do:**
- Use semantic HTML structure
- Add descriptive alt text to all images
- Break content into scannable sections
- Use lists for clarity
- Link to relevant resources
- Optimize images before uploading
- Preview before publishing

## Need Help?

If you need assistance with formatting or have questions about the CMS editor, contact the development team.
