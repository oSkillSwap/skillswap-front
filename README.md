# SkillSwap Front

Frontend application for the SkillSwap project developed with React, TypeScript, Sass, and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: 18.x or higher)
- npm or yarn or pnpm

## Technologies Used

- [Vite](https://vitejs.dev/) - Ultra-fast build tool
- [React 19](https://react.dev/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed programming language based on JavaScript
- [Sass](https://sass-lang.com/) - CSS preprocessor
- [Biome](https://biomejs.dev/) - Formatting and linting tool

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
This command first runs TypeScript compilation then builds the application with Vite.

### `npm run preview`

Allows you to preview the production build locally before deployment.

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

## Biome Configuration

[Biome](https://biomejs.dev/) is used for code formatting and linting. You can configure Biome by modifying the `biome.json` file at the project root.

Example commands for using Biome:

```bash
# Check code with Biome
npm run check

# Format code with Biome
npm run format
```

## Using Sass

This project uses Sass for styling. Sass files (`.scss`) can be directly imported into React components:

```tsx
import './MyComponent.scss';

function MyComponent() {
  return <div className="my-component">Hello World</div>;
}
```

## Deployment

To deploy the application:

1. Create a production build with `npm run build`
2. The `dist` folder contains all the necessary files for deployment
3. Deploy the contents of the `dist` folder to your preferred hosting provider

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.