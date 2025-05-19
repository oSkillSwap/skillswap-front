# SkillSwap Frontend
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/oSkillSwap/skillswap-front?color=blue&label=version)](https://github.com/oSkillSwap/skillswap-front/releases)
![Contributors](https://img.shields.io/github/contributors/oSkillSwap/skillswap-front)
![Language](https://img.shields.io/github/languages/top/oSkillSwap/skillswap-front)

SkillSwap is a web platform that enables users to exchange skills and knowledge. This repository contains the frontend application, built with React, TypeScript, Sass, and Vite.

## Table of Contents

- [SkillSwap Frontend](#skillswap-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Styling with Sass](#styling-with-sass)
  - [Vite Configuration](#vite-configuration)
  - [Deployment](#deployment)
  - [License](#license)

## Features

- User authentication and profile management
- Skill and availability management
- Messaging and conversation system (real-time with Socket.IO)
- Responsive UI with reusable components
- Category carousel, search, and filtering
- Avatar upload and inline profile editing
- Toast notifications and modals
- Modern, maintainable codebase with TypeScript and strict linting

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: 18.x or higher)
- npm, yarn, or pnpm

## Technologies Used

- [Vite](https://vitejs.dev/) - Ultra-fast build tool
- [React 19](https://react.dev/) - UI library
- [React Router](https://reactrouter.com/) - Routing
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Sass](https://sass-lang.com/) - CSS preprocessor
- [Biome](https://biomejs.dev/) - Linting and formatting
- [Swiper](https://swiperjs.com/) - Carousel/slider
- [Lucide React](https://lucide.dev/) - Icon library
- [Axios](https://axios-http.com/) - HTTP client
- [Socket.IO Client](https://socket.io/docs/v4/client-api/) - Real-time communication

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:oSkillSwap/skillswap-front.git
cd skillswap-front
npm install
```

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**  
  Runs the app in development mode at [http://localhost:5173](http://localhost:5173).

- **`npm run build`**  
  Builds the app for production to the `dist` folder.

- **`npm run preview`**  
  Previews the production build locally.

- **`npm run check`**  
  Runs Biome to check for code issues.

- **`npm run format`**  
  Formats the codebase using Biome.

## Project Structure

```
skillswap-front/
├── public/             # Static files
├── src/                # Application source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components (UI, profile, tabs, etc.)
│   ├── contexts/       # React context providers (e.g., AuthContext)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page-level components (e.g., Message, Profile)
│   ├── services/       # API and utility services (e.g., axios, token refresh)
│   ├── styles/         # Global styles, variables, and mixins (Sass)
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root application component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # Vite environment types
├── .gitignore
├── biome.json
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Styling with Sass

- All global variables and mixins are defined in `src/styles/variables/`.
- Thanks to Vite configuration, all SCSS files automatically have access to these variables and mixins.
- Example usage in a component:

```tsx
import './MyComponent.scss';

function MyComponent() {
  return <div className="my-component">Hello World</div>;
}
```

## Vite Configuration

Vite is set up to inject all SCSS variables and mixins from `src/styles/variables` into every style file automatically:

```js
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "/src/styles/variables" as *;`,
    },
  },
},
```

## Deployment

1. Build the app with `npm run build`.
2. Deploy the contents of the `dist` folder to your preferred static hosting provider.

## License

Distributed under the MIT License. See `LICENSE` for more information.