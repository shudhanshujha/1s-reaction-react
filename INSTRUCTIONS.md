# 1 Second Reaction - Project Instructions

## How to Run the Project (Development)

1.  Navigate to the project directory:
    ```bash
    cd 1s-reaction-react
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the provided local URL (usually `http://localhost:5173`) in your browser. Use your browser's "Mobile View" (F12 -> Toggle Device Toolbar) for the best experience.

## How to Build for Production

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  The optimized production files will be generated in the `dist/` folder.
3.  You can preview the build locally:
    ```bash
    npm run preview
    ```

## Publishing to Google Play Store (Capacitor/Cordova)

To wrap this web app into a native mobile app for Android/iOS, it is recommended to use **Capacitor**.

### Steps to add Capacitor:

1.  Install Capacitor CLI and Core:
    ```bash
    npm install @capacitor/core @capacitor/cli
    ```
2.  Initialize Capacitor:
    ```bash
    npx cap init
    ```
3.  Add the Android platform:
    ```bash
    npm install @capacitor/android
    npx cap add android
    ```
4.  Sync your web build with the Android project:
    ```bash
    npm run build
    npx cap sync
    ```
5.  Open in Android Studio to build the APK/Bundle:
    ```bash
    npx cap open android
    ```

### Integrating Real In-App Purchases and Ads:

- **Ads**: Use `@capacitor-community/admob` for Google AdMob. Replace the simulated `handleWatchAd` in `GamePage.tsx` with calls to the AdMob plugin.
- **In-App Purchases**: Use `cordova-plugin-purchase` (works with Capacitor) to handle real coin pack purchases.

## Code Structure

- `src/components`: Reusable UI elements (GameBar, PerfectZone, etc.).
- `src/hooks`: Custom hooks for game logic and local storage.
- `src/pages`: Main game controller and screen manager.
- `src/styles`: CSS files for game and shop themes.
