# SOMA Web - Project Context

Instructional guide for the SOMA (Skaba's Own Macronutrients App) frontend project.

## Project Overview
*   **Purpose**: A Vue 3 application for macronutrient tracking and food management.
*   **Tech Stack**:
    *   **Framework**: Vue 3 (Composition API, `<script setup>`).
    *   **Build Tool**: Vite.
    *   **Authentication**: Firebase SDK.
    *   **Styling**: Vanilla CSS (global `app.css` + component-scoped styles).
    *   **Type Safety**: TypeScript.

## Building and Running
*   **Development**: `npm run dev`
*   **Production Build**: `npm run build`
*   **Type Checking**: `npm run type-check`

## Development Conventions
*   **Components**: Use `<script setup lang="ts">` for all new components.
*   **API Calls**: Use the `fetchWithAuth` client in `src/lib/api/client.ts`.
*   **Data Models**: Define domain models in `src/lib/model/`.
*   **Styling**: 
    *   Prefer CSS variables in `:root` (defined in `app.css`).
    *   Use common layout classes like `.col`, `.row`, `.center`, etc.
    *   Scoped styles are mandatory for components.
*   **Forms**: Use shared UI components like `LabeledInput`, `LabeledNumberInput`, and `ImageInput`.
*   **State Management**: Use Pinia-like stores in `src/lib/stores/`.

## Key Files
*   `package.json`: Scripts and dependencies.
*   `src/lib/api/client.ts`: Custom fetch implementation with Firebase JWT.
*   `src/lib/constants/nutrition.const.ts`: Nutritional constants (kcal/kJ ratios, display names).
*   `src/app.css`: Global styles and layout primitives.
*   `src/lib/features/`: Feature-based component grouping.
