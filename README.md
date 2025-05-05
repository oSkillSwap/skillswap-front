# SkillSwap Frontend

Frontend application for the SkillSwap project developed with React, TypeScript, Sass, and Vite. SkillSwap is a platform that enables users to exchange skills and knowledge.

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: 18.x or higher)
- npm, yarn, or pnpm

## Technologies Used

- [Vite](https://vitejs.dev/) - Ultra-fast build tool
- [React 19](https://react.dev/) - JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - Declarative routing for React applications
- [TypeScript](https://www.typescriptlang.org/) - Typed programming language based on JavaScript
- [Sass](https://sass-lang.com/) - CSS preprocessor
- [Biome](https://biomejs.dev/) - Formatting and linting tool
- [Swiper](https://swiperjs.com/) - Modern touch slider library
- [Lucide React](https://lucide.dev/) - Icon library for React

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone git@github.com:O-clock-Samoussas/skill-swap-front.git
cd skill-swap-front

# Install dependencies
npm install
```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the application in development mode.  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will automatically reload when you make changes to the code.

### `npm run build`

Builds the application for production to the `dist` folder.  
This command first runs TypeScript compilation and then builds the application with Vite.

### `npm run preview`

Allows you to preview the production build locally before deployment.

### `npm run check`

Runs the Biome linter to check for code issues.

### `npm run format`

Formats the code using Biome.

## Project Structure

```
skillswap-front/
├── public/             # Static files publicly accessible
├── src/                # Application source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # Global Sass files and variables
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root application component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # Types for Vite environment
├── .gitignore          # Files and folders ignored by Git
├── biome.json          # Biome configuration
├── index.html          # Main HTML file
├── package.json        # Dependencies and npm scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Styling with Sass

This project uses Sass for styling. Sass files (`.scss`) can be directly imported into React components:

```tsx
import './MyComponent.scss';

function MyComponent() {
  return <div className="my-component">Hello World</div>;
}
```

### Example Sass Variables and Mixins

The project includes reusable variables and mixins for consistent styling. For example:

- **Variables**: Colors, typography, spacing, and breakpoints are defined in `src/styles/variables/`.
- **Mixins**: Transition effects like `transition-color` and `transition-border` are defined in `src/styles/variables/_transitions.scss`.

## Deployment

To deploy the application:

1. Create a production build with `npm run build`.
2. The `dist` folder contains all the necessary files for deployment.
3. Deploy the contents of the `dist` folder to your preferred hosting provider.

## License

Distributed under the MIT License. See `LICENSE` for more information.