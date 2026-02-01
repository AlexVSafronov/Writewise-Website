# WriteWise Blog Formatting Guide

This guide explains all the rich text formatting features available when creating blog posts in the Strapi CMS. The CMS uses **Markdown** format for content, which is automatically converted to styled HTML on the website.

## Available Formatting Options

### Headers
Use headers to organize your content hierarchically:

```markdown
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
```markdown
**Goethe Institute**
__Important concept__
```

*Italic Text* - Use for subtle emphasis, foreign words, or book/article titles
```markdown
*zeitgeist*
_The Art of Learning_
```

***Bold + Italic*** - Use sparingly for maximum emphasis
```markdown
***Critical point***
___Maximum emphasis___
```

### Links

Internal links (to other pages on your site):
```markdown
[Read more about grammar tips](/blog/another-post)
```

External links (to other websites):
```markdown
[External Resource](https://example.com)
```

**Best practices:**
- Use descriptive anchor text (not "click here")
- Link to relevant resources to add value
- Keep URLs clean and readable

### Lists

**Bulleted Lists** - Use for unordered items:
```markdown
- First advantage: accessibility
- Second advantage: instant feedback
- Third advantage: adaptive difficulty

or

* First advantage: accessibility
* Second advantage: instant feedback
* Third advantage: adaptive difficulty
```

**Numbered Lists** - Use for sequential steps or ranked items:
```markdown
1. Take the initial assessment
2. Review your results
3. Create a study plan
```

### Images

Upload images through the Strapi media library, then reference them in your content:

```markdown
![Deutsche Welle placement test results showing B1 level](/uploads/test-screenshot.jpg)
```

Images automatically support:
- **Alt text** - The text in square brackets is used for SEO and accessibility
- **Lazy loading** - Images load as user scrolls
- **Responsive sizing** - Auto-adjusts to screen size

**Best practices for images:**
1. Always add descriptive alt text (the text in square brackets)
2. Use high-quality images (1200x600px for featured, 800x600px for inline)
3. Optimize file size (use JPG for photos, PNG for graphics)
4. Upload through Strapi's media library first, then copy the URL

**Example:**
```markdown
![Student taking online German placement test on laptop](/uploads/german-test-screenshot.jpg)
```

### Blockquotes

Use for:
- Important callouts
- Quotes from experts
- Spoiler alerts
- Key takeaways

```markdown
> Spoiler Alert: Not all placement tests give consistent results!

> Multi-line blockquotes
> can span multiple lines
> like this.
```

### Code Blocks

Inline code:
```markdown
Use the `CEFR scale` for assessment
```

Code blocks (for longer code):
````markdown
```javascript
function assessLevel(score) {
  return score > 80 ? 'B2' : 'B1';
}
```
````

### Tables

Use tables for comparisons, pricing, or structured data:

```markdown
| Test Provider     | Cost | Duration | Level Range |
|-------------------|------|----------|-------------|
| Goethe Institute  | Free | 15 min   | A1-C2       |
| Deutsche Welle    | Free | 30 min   | A1-C1       |
```

**Tips:**
- Use pipes `|` to separate columns
- Use dashes `---` to separate the header row
- Content alignment is automatic
- Keep column widths consistent for readability

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

```markdown
## Why Online Placement Tests Matter

Choosing the right **CEFR level** for your language studies is crucial. Online placement tests provide a *convenient and accurate* way to assess your current abilities.

![CEFR language proficiency levels chart showing A1 through C2](/uploads/cefr-levels.jpg)

### Top Free Placement Tests

Here are the most reliable free options:

- **Goethe Institute** - Comprehensive test covering all skills
- **Deutsche Welle** - Quick assessment with instant results
- **GLS Berlin** - Focus on practical communication skills

> Spoiler Alert: Test results can vary between providers!

For more details, check out our guide on [how to test your German level](/blog/how-to-test-your-german-level).

### Advantages of Digital Testing

1. Instant feedback on your performance
2. Adaptive difficulty based on your answers
3. Detailed breakdown by skill area

Start with the [Deutsche Welle placement test](https://www.dw.com/de/deutsch-lernen/einstufungstest/s-32523) to get your baseline level.
```

## Common Mistakes to Avoid

❌ **Don't:**
- Use multiple H1 headers (#)
- Skip heading levels (## → ####)
- Use "click here" as link text
- Forget alt text on images
- Create walls of text without breaks
- Use all caps for emphasis
- Overuse bold and italic formatting
- Mix different list styles in the same list

✅ **Do:**
- Use proper Markdown hierarchy (# → ## → ### → ####)
- Add descriptive alt text to all images
- Break content into scannable sections
- Use lists for clarity
- Link to relevant resources with descriptive text
- Optimize images before uploading
- Preview before publishing
- Use blank lines to separate paragraphs and sections

## Need Help?

If you need assistance with formatting or have questions about the CMS editor, contact the development team.
