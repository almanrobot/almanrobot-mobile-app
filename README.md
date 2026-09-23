# Alman Robot – Mobile App

![Status](https://img.shields.io/badge/status-archived%20(2026)-lightgrey)
![React Native](https://img.shields.io/badge/React%20Native-0.72-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178c6)
![Platforms](https://img.shields.io/badge/platforms-iOS%20%7C%20Android-informational)

Alman Robot was a language-learning app that helped Turkish speakers practise **spoken German** and prepare for the **TELC exam**. Users had a conversation with a "robot": the app spoke a German sentence, the user answered out loud, and the app scored the pronunciation before moving on.

The app was published on the **App Store** and **Google Play** (2023–2026). The project has been discontinued, and this repository is kept as a public archive. For the product story (v1 membership model, v2 ad-based pivot, sunset), see the [organisation profile](https://github.com/almanrobot).

> **Note:** The production backend has been shut down, so the app can't load content any more. The code is here for reference.

## Features

- **Speaking practice.** German text-to-speech (`react-native-tts`) and speech recognition (`@react-native-voice/voice`, `de-DE`), with word-level scoring, retry and skip, and a progress bar.
- **Course and lesson catalogue.** Free and members-only content, fetched from a REST API.
- **User-generated content.** Users could build their own practice "robots". Drafts were stored on the device (AsyncStorage) and could be synced to the server.
- **Authentication.** Phone-number registration with SMS verification, login and logout, password change and forgot-password. Sessions used JWTs, with the role decoded on the client for access control.
- **Membership and payments.** Subscription checkout through the PayTR payment gateway (WebView), server-side pricing, promo codes, and a discount strategy based on how often the app was opened.
- **Monetisation (v2).** Google AdMob banner and interstitial ads, plus a remotely configured home-screen promotion.
- **Operations.** Remote force-update check.

## Architecture

The code is split into layers, loosely following Clean Architecture, with MVVM on the presentation side:

```
src/
├── Data/
│   ├── EndPoint.ts        # API endpoint definitions
│   ├── DataSource/        # HTTP (axios) and AsyncStorage access
│   └── Repository/        # Maps data sources to domain results
├── Domain/                # Use cases (Login, Register, Course, Lesson, Robot)
├── Models/                # TypeScript domain models
├── Presentation/          # Screens (View) + ViewModels (custom hooks)
├── Admob/                 # Ad components
├── AuthContext.tsx        # Auth state (React Context)
└── PriceContext.tsx       # Pricing / promo code state
```

A request goes **View → ViewModel → Use case → Repository → DataSource → API**. Each screen keeps its state in a ViewModel hook, so the UI components contain very little logic.

## Tech stack

| Area | Tools |
| --- | --- |
| Core | React Native 0.72, React 18, TypeScript |
| UI | React Native Paper (Material 3), styled-components, vector icons, custom theme with light and dark palettes |
| Navigation | React Navigation (stack and bottom tabs) |
| Forms | react-hook-form, input masks |
| Networking | axios, jwt-decode |
| Speech | react-native-tts, @react-native-voice/voice |
| Services | Google Mobile Ads, PayTR (WebView) |
| Tooling | ESLint, Prettier (sorted imports), Husky and lint-staged, commitlint (Conventional Commits), standard-version, Reactotron |

## Development workflow

This repository is a single-commit snapshot. The original private repository had about 400 commits (March 2023 to April 2024), and the team worked like this:

- Work was tracked in GitHub issues and merged through feature branches and pull requests (150+ PRs).
- Commit messages followed [Conventional Commits](https://www.conventionalcommits.org/), checked by commitlint in a Husky hook.
- Releases and the [CHANGELOG](CHANGELOG.md) were generated with standard-version.

## Running locally

Requirements: Node (see `.node-version`), Ruby and CocoaPods (see `.ruby-version`), Xcode 15, and Android Studio.

```bash
npm install
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios      # or: npm run android
```

To build it yourself, note that:

- Android release signing reads `MYAPP_UPLOAD_*` values from `~/.gradle/gradle.properties`.
- Debug builds use Google's AdMob **test** ad units.
- Content screens won't load, because the backend is offline.

## Known limitations

This is the code as it was when the project stopped, with light cleanup for publishing. A few things I'd change in a rewrite:

- **Secure storage.** The access token is kept in AsyncStorage. A production app should use the Keychain or Keystore (for example with `react-native-keychain`).
- **Tests.** There are no automated tests.
- **Types and styles.** Some screens use `any` and inline styles (they show up as ESLint warnings).
- **Unfinished pattern.** The Payment and Change Password screens don't follow the ViewModel pattern yet.
- **v1 leftovers.** The membership screens (Membership, Profile) are still in the code. The v2 ad-based model hid them from the tab bar, and the Profile screen can't be reached any more.
- **Firebase.** The Firebase packages are installed, but push notifications were never finished.

## Author

Developed by [Faruk Yıldırım](https://github.com/FARUK-YILDIRIM).
