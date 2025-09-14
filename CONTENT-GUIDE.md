# Content Management Guide

This website uses a JSON-based content management system that separates all editable text from the HTML code. This makes it easy to update website content without touching the underlying code.

## How It Works

- **Content File**: `assets/content/site-content.json` - Contains all editable text and metadata
- **HTML Markers**: Elements with `data-content="path.to.content"` attributes automatically load content
- **Dynamic Loading**: JavaScript loads the JSON file and populates the HTML on page load

## Editing Content

To update website content, simply edit the `assets/content/site-content.json` file:

### 1. Basic Text Content
```json
{
  "hero": {
    "mainHeading": "FIND YOUR SOUND",
    "subtitle": "Expert piano instruction, composition guidance, and music theory mastery"
  }
}
```

### 2. Contact Information
```json
{
  "contact": {
    "info": {
      "details": {
        "email": {
          "value": "info@elitepianostudio.com"
        },
        "phone": {
          "value": "(123) 456-7890"
        }
      }
    }
  }
}
```

### 3. Services
```json
{
  "services": {
    "cards": [
      {
        "icon": "🎹",
        "title": "Piano Instruction",
        "description": "From beginner fundamentals...",
        "features": [
          "Proper technique and posture",
          "Sight-reading skills"
        ]
      }
    ]
  }
}
```

### 4. Testimonials
```json
{
  "testimonials": {
    "reviews": [
      {
        "text": "My 7-year-old went from complete beginner...",
        "author": "Sarah M., Parent"
      }
    ]
  }
}
```

### 5. Navigation Menu
```json
{
  "navigation": {
    "menuItems": [
      { "label": "Home", "href": "#home" },
      { "label": "About", "href": "#about" }
    ]
  }
}
```

## Content Structure

The JSON file is organized into main sections that correspond to website sections:

- **metadata**: Page title, description, site name
- **navigation**: Logo and menu items  
- **hero**: Main banner content and buttons
- **about**: About section text and qualifications
- **services**: Service cards with icons, titles, descriptions, features
- **testimonials**: Customer reviews and authors
- **contact**: Contact information and form labels
- **footer**: Copyright and subtitle text

## Location Mapping

Each content section includes a `location` field that indicates which HTML section it affects:

- `"location": "section#home"` - Hero/home section
- `"location": "section#about"` - About section  
- `"location": "section#services"` - Services section
- `"location": "section#testimonials"` - Testimonials section
- `"location": "section#contact"` - Contact section
- `"location": "footer"` - Footer section

## Dynamic Variables

Some content supports variables that are automatically replaced:

- `{year}` - Replaced with the year from metadata
- `{siteName}` - Replaced with site name from metadata  
- `{tagline}` - Replaced with tagline from metadata
- `{name}` - In form messages, replaced with user's name

## Adding New Content

To add new editable content:

1. **Add to JSON**: Include the new content in `site-content.json`
2. **Add HTML Attribute**: Add `data-content="path.to.content"` to the HTML element
3. **Update JavaScript**: If it's a complex structure, add handling in `main.js`

## Form Configuration

The contact form is also configurable through JSON:

```json
{
  "contact": {
    "form": {
      "fields": {
        "name": {
          "placeholder": "Your Name",
          "required": true,
          "type": "text"
        }
      },
      "submitButton": {
        "text": "Send Message",
        "loadingText": "Sending...",
        "successMessage": "Thank you, {name}!"
      }
    }
  }
}
```

## Best Practices

1. **Backup**: Always backup the JSON file before making changes
2. **Validation**: Use a JSON validator to check syntax before saving
3. **Testing**: Test changes locally before deploying
4. **Consistency**: Keep formatting and tone consistent across sections
5. **Length**: Be mindful of text length for mobile responsiveness

## Troubleshooting

- **Content not updating**: Check browser cache, hard refresh (Ctrl+F5)
- **JSON errors**: Use jsonlint.com to validate JSON syntax
- **Missing content**: Verify the `data-content` path matches JSON structure
- **Formatting issues**: Check for unescaped quotes or special characters in JSON

## File Locations

- Content: `assets/content/site-content.json`
- HTML: `index.html` (with data-content attributes)
- JavaScript: `assets/scripts/main.js` (content loading system)
- This guide: `CONTENT-GUIDE.md`