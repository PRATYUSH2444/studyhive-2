# DESIGN.md — StudyHive AI War Room

## Visual Atmosphere
The design evokes a dark, high-stakes "War Room" or technical "Bloomberg Terminal" aesthetic, balancing intense focus with premium AI features. The UI relies on profound "Deep Space" background tones separated by tonal layered cards rather than solid borders. Accent lighting (like "rim light" inset shadows and electric blue or purple glows) adds a hardware-like tactile feel to the high-density layout.

## Color Palette
| Token Name | Hex | Role |
|-----------|-----|------|
| `surface-dim` | `#08080C` | The deep space void base background |
| `surface-container-low` | `#0F0F18` | Primary tactical card surface color |
| `surface-container-highest` | `#353439` | Floating nav elements and highlighted secondary containers |
| `primary` | `#0EA5E9` / `#89ceff` | Electric blue accents, primary glows, active states, key data viz |
| `secondary-container` | `#8B5CF6` / `#c4abff` | AI feature indicators, ARIA components, glassmorphism elements |
| `outline-variant` | `#1C1C2E` / `#3e4850` | Faint "Ghost Borders" to separate layered data gently |
| `on-surface` | `#e4e1e8` | Primary high-contrast text |
| `on-surface-variant` | `#bec8d2` / `#9CA3AF` | Dimmed body text or labels to reduce eye strain |
| `error` | `#ffb4ab` / `#EF4444` | Pulsing notification dots and "danger" elements like missed deadlines |

## Typography
- **Font Family**: `Space Grotesk` (Headline / Display), `Inter` (Data / Body / Labels)
- **Heading sizes**: text-3xl, text-4xl, text-5xl, md:text-7xl, text-8xl
- **Body size**: text-xs, text-sm, text-base, text-lg
- **Weights used**: font-normal, font-medium, font-semibold, font-bold, font-extrabold, font-black
- **Letter spacing**: tracking-tight, tracking-tighter, tracking-wide, tracking-wider, tracking-widest, tracking-[0.2em]

## Spacing Scale
- 4px (`p-1`, `gap-1`, `mt-1`)
- 8px (`p-2`, `gap-2`, `pt-2`)
- 12px (`p-3`, `gap-3`)
- 16px (`p-4`, `gap-4`)
- 24px (`p-6`, `gap-6`)
- 32px (`p-8`, `gap-8`)
- 48px (`gap-12`, `pb-12`)

## Components

### Cards
- **Tactical Card**: Background `bg-[#0F0F18]` (`bg-surface-container-low`), `rounded-xl` or `rounded-lg`, border `border-outline-variant/30` or `border-[#1C1C2E]`.
- **Card Edge Light**: Custom rim lighting using `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]` instead of standard drop shadow layouts.
- **Glass Panel**: Background `bg-surface-container-low/50`, backdrop blur, and ghost borders.

### Buttons
- **Action Primary**: Background `bg-primary` or `bg-gradient-to-r from-primary-container to-primary`, text `text-on-primary`, `rounded-lg`, hover `hover:scale-[0.98]`.
- **AI Action (Ghost)**: Background purple tint like `bg-secondary/10`, border `border-secondary/30`, text `text-secondary`, `rounded-lg`, hover `hover:bg-surface-container-high`.
- **Sidebar Action**: Transparent background with `p-3`, `w-full`, text `text-slate-500`, hover state `hover:bg-[#1C1C2E] hover:text-slate-200`.

### Badges / Pills
- **Subject Tag / Label**: `rounded-full` (999px), `px-3` `py-1`, text `text-[10px]` or `text-xs`, uppercase, `border outline-variant`.
- **Hexagon Badges**: Special user avatars or achievements using custom `hexagon-mask`.

### Input Fields
- **Search / Input**: Background `bg-surface-container-lowest` or `bg-[#0F0F18]`, `rounded-lg`, no default border or `border-outline-variant/20`, focus `border-primary` with `shadow-[0_0_8px_#89ceff]`. Placeholder `text-slate-600` or `text-on-surface-variant`.

## Animation Hints
- Smooth interactions primarily driven by `transition-all duration-200`, `transition-colors`.
- Hover micro-interactions include `hover:scale-105`, `group-hover:scale-110`, and click interactions `active:scale-95`.
- Live notification or "ARIA thinking" indicators use `animate-pulse` or `animate-ping`.
