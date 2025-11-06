# 🍳 Dishcovery – Recipe Finder

Beautiful, responsive Recipe Finder built with React and Tailwind CSS. Search by name or ingredient, favorite recipes, and filter to see only favorites — all on the client with a static JSON data file.

## ✨ Features

- **Search (name or ingredient)**: Case-insensitive, instant filtering
- **Favorites**: Toggle ❤️ per recipe; persisted in `localStorage`
- **Show Favorites Only**: Quick filter toggle
- **Responsive UI**: Mobile → desktop, fluid grid
- **Subtle motion**: Lift/scale on hover, soft shadows
- **Static data**: No backend; uses `src/data/recipes.json`

## 🧱 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **LocalStorage** for persistence

## 📁 Project Structure

```
src/
  components/
    RecipeCard.jsx     # Single recipe card (image, ingredients, preview, favorite)
    RecipeList.jsx     # Responsive grid of cards
    SearchBar.jsx      # Controlled search input, persists to localStorage
  data/
    recipes.json       # Static dataset of recipes
  App.jsx              # App shell, state, filters, layout
  index.css            # Tailwind import + theme variables + component helpers
  main.jsx             # Vite/React bootstrap
```

## 🚀 Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

4) Preview production build (optional)

```bash
npm run preview
```

## 🥙 Data Model (`recipes.json`)

Provide a local JSON array with 20 recipes (this repo includes a single example).

Each item must have:

- `id` (number)
- `name` (string)
- `image` (URL string)
- `ingredients` (array of strings)
- `instructions` (array of steps or a string)

Example item:

```json
{
  "id": 1,
  "name": "Spaghetti Carbonara",
  "image": "https://source.unsplash.com/400x300/?spaghetti",
  "ingredients": ["spaghetti", "eggs", "bacon", "parmesan", "black pepper"],
  "instructions": [
    "Boil spaghetti until al dente.",
    "Fry bacon until crisp.",
    "Mix eggs and parmesan in a bowl.",
    "Combine pasta, bacon, and egg mixture quickly.",
    "Serve hot with black pepper."
  ]
}
```

## 🧠 Architecture & State

- `App.jsx`
  - Loads `recipes.json`
  - Manages: `search`, `favorites`, `showFavoritesOnly`
  - Persists: `search` and `favorites` to `localStorage`
  - Filters via `useMemo`:
    - Name contains query OR any ingredient contains query (case-insensitive)
- `SearchBar.jsx`
  - Controlled input; writes `dishcovery:search` to `localStorage`
- `RecipeCard.jsx`
  - Displays image, name, ingredients, short instruction preview
  - Favorite button toggles inclusion in `dishcovery:favorites`
- `RecipeList.jsx`
  - Responsive CSS grid across breakpoints

LocalStorage keys:

- `dishcovery:search`
- `dishcovery:favorites`

## ♿ Accessibility Notes

- Interactive elements have clear labels (e.g., favorite button `aria-label`)
- Sufficient color contrast with dark text and warm backgrounds
- Images include meaningful `alt` text (recipe names)

## 🧪 Testing Ideas (manual)

- Search for an ingredient present in multiple recipes — grid updates correctly
- Toggle favorite on several cards — refresh page; favorites persist
- Use “Show Favorites Only” — only favorited items remain visible
- Resize viewport from mobile → desktop — layout adapts fluidly

## 🛠 Troubleshooting

- Tailwind utilities not applying?
  - Ensure `src/index.css` contains `@import "tailwindcss";`
  - Ensure `postcss.config.js` has `"@tailwindcss/postcss"` plugin
  - Ensure `tailwind.config.js` `content` includes `./index.html` and `./src/**/*.{js,jsx,ts,tsx}`
- No recipes showing?
  - Check `src/data/recipes.json` format and that it exports an array
  - Confirm each recipe has the required fields
- Images not loading?
  - Use placeholder URLs (e.g., Unsplash queries) or local assets

## 📸 Screenshot

Add a screenshot (or animated GIF) demonstrating search and favorites here.

## 🤝 Contributing

PRs are welcome. For new components, follow the existing naming, accessibility, and Tailwind conventions. Keep UI copy concise and friendly.

## 📄 License

MIT — feel free to use this as a base for your own projects.


# Dishcovery
