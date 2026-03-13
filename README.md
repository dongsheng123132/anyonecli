# AnyoneCLI

> CLI identity for every human. `curl anyonecli.com/dongsheng`

AnyoneCLI gives developers and builders a terminal-style profile page with a JSON API. Think of it as your CLI business card — accessible via browser or `curl`.

## Features

- **Terminal-style profile page** — looks like a real terminal
- **JSON API** — `curl anyonecli.com/username` returns JSON (content negotiation)
- **Browser-friendly** — visit the same URL in a browser to see a styled page
- **OG image generation** — auto-generated social preview cards
- **Community-driven** — add yourself via Pull Request

## Try it

```bash
# Get a profile as JSON
curl anyonecli.com/dongsheng

# Or visit in browser
open https://anyonecli.com/dongsheng
```

## Add Your Profile

1. Fork this repo
2. Create `data/profiles/YOUR_USERNAME.json`:

```json
{
  "name": "your_username",
  "display_name": "Your Name",
  "bio": "One-line bio about yourself",
  "skills": ["skill_one", "skill_two", "skill_three"],
  "commands": [
    { "name": "command_name", "description": "What this command does" }
  ],
  "contact": {
    "github": "your_github",
    "x": "your_x_handle",
    "email": "you@example.com"
  },
  "openclaw": false,
  "created_at": "2026-03-13"
}
```

3. Open a Pull Request
4. Once merged, your profile is live at `anyonecli.com/your_username`

## Profile Badge

Add a badge to your README:

```markdown
[![AnyoneCLI](https://img.shields.io/badge/AnyoneCLI-profile-black?style=flat-square)](https://anyonecli.com/YOUR_USERNAME)
```

## Profiles

| Username | Bio |
|----------|-----|
| [dongsheng](https://anyonecli.com/dongsheng) | AI Product Builder \| 50+ projects shipped |

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## License

MIT
