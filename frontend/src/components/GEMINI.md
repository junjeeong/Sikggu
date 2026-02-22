# SIKGGU FE Project Guidelines

## Project Overview

**SIKGGU: Rescue the Ingredients!**
A location-based real-time time sale O2O service connecting local marts (reducing food waste) and single-person households (reducing cost of living).

## Technical Stack

- **Core:** React 18 + TypeScript + Vite + Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **Form Handling:** React Hook Form + Zod
- **Server State:** TanStack Query (React Query)
- **Testing & Documentation:** Vitest (or Jest) + Storybook

## Directory Structure

- `/src/api/`: API definitions and service calls.
- `/src/components/`: Reusable UI components. Each component must have an associated `.stories.tsx` file.
- `/src/mock/`: Mock data for prototyping.
- `/src/pages/`: Page-level components.
- `/src/types/`: Shared TypeScript interfaces.
- `/src/utils/`: Utility functions.

## Component Design Principles

- **Type Safety:** Define strict TypeScript types for all props.
- **Documentation:** Every component requires a `.stories.tsx` file for Storybook.
- **Testing:** Every component must include unit tests.
- **Theming:** Full support for Dark Mode is mandatory.
- **JSDoc:** Provide detailed JSDoc comments for all components and functions.

## Styling & Design System

- **Framework:** Use Tailwind CSS utility classes exclusively.
- **No Inline Styles:** Avoid inline styles (`style={{...}}`) at all costs.
- **Mobile-First:** Implement responsive design starting from the smallest screen size.
- **Theming:** Use CSS variables for theme colors.

## Coding Standards & State Logic

- **Component Style:** Functional Components with Hooks.
- **Naming:** - Components: **PascalCase** (e.g., `ProductCard.tsx`).
  - Hooks: **"use"** prefix (e.g., `useProductList.ts`).
- **State:**
  - `useState`: Simple component state.
  - `useReducer`: Complex logic.
  - **Zustand**: Global state.
  - **TanStack Query**: Asynchronous server state and caching.

## Specific Requirements

- **Error Handling:** Robust error handling for all API interactions.
- **Validation:** Strict form validation using `react-hook-form` and `zod`.
