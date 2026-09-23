# Changelog

All notable changes to this project are documented in this file.

## Unreleased

Changes made while preparing the public archive in 2026. They were never shipped to the stores.

### Changed

- Android release-signing values are now read from the developer's `~/.gradle/gradle.properties` instead of the project.
- Debug builds now use Google's AdMob test ad units.
- Renamed misspelled identifiers and files (`StandardBanner`, `robotSpeak`, `*.component.tsx`).
- Rewrote code comments in English and removed commented-out code, debug logging and unused components.
- Fixed all ESLint errors and strict-equality, shadowing and JSX-scope warnings.

### Fixed

- The promo code modal no longer resets its input on every parent render, and no longer sends placeholder text when the field is left empty.

### Removed

- The default React Native Jest test and its dependencies.

## 2.0.0 - 2024-04-08

Relaunch after the pivot from the membership model to an ad-supported model. Published on the App Store.

### Added

- Google AdMob banner ads on the course and lesson lists, and an interstitial ad when the user leaves a practice session.
- A home-screen promotion configured from the backend.
- A force-update screen shown when the installed version is older than the minimum version on the server.
- Firebase Cloud Messaging dependencies. The push notification integration was not finished.

### Changed

- All lessons are free, and practice no longer needs an account.
- User-created content is now stored against the device ID instead of the user's access token.
- Moved to the v2 backend with new base URL and endpoints.
- Redesigned the practice screen as a chat-style conversation.
- Upgraded React Native from 0.71.4 to 0.72.6.

### Removed

- The Join (membership) and Profile tabs from the bottom navigation.
- The membership discount banner from the course list.

### Fixed

- Builds with Xcode 15 for iOS 17.

## 1.0.1 - 2023-08-16

Android only.

### Fixed

- Layout of the PayTR payment form on Android.

## 1.0.0 - 2023-08-07

First public release on the App Store and Google Play (package version `0.0.3`).

### Added

#### Speaking practice

- A conversation practice screen. The robot speaks each German line with text-to-speech (`react-native-tts`), and the user answers by voice through speech recognition (`@react-native-voice/voice`, `de-DE`).
- Word-by-word pronunciation scoring with a score panel, emoji feedback and a 40% pass mark.
- Retry and skip, previous and next line navigation, and a lesson progress bar.
- Tap a chat bubble to hear the line again, with an option to replay it more slowly.

#### Courses and lessons

- A home screen with exam-preparation categories, a Help page and a Forgot Password page (both in WebViews).
- A course and lesson catalogue loaded from the REST API, with free courses listed first.
- Free lesson content that doesn't need an account.
- Loading indicators for courses and lessons.

#### User-generated content

- Users can create their own practice "robots" as drafts on the device (AsyncStorage) using `react-hook-form`.
- Drafts can be published to the server and practised like built-in lessons.
- Users can delete their drafts and their published courses.

#### Accounts

- Phone-number registration with a step-by-step form, masked phone input, and support for Turkish and international numbers.
- SMS verification code confirmation.
- Login and logout, with the access token saved on the device.
- An authentication context that decodes the JWT to check the user's role.
- Password change.
- Device information sent on registration, login and logout.

#### Membership and payments

- A membership page with monthly pricing loaded from the server.
- Subscription checkout through the PayTR payment gateway, including token generation and a 3-D Secure WebView flow.
- Promo codes.
- A discount offer that depends on how many times the user has opened the app.

#### App and platform

- Bottom-tab and stack navigation.
- A React Native Paper (Material 3) theme with a custom palette and the Noto Sans font.
- App icons and splash screens for iOS and Android.
- Android release build configuration.

#### Developer tooling

- Reactotron for AsyncStorage inspection, network logging and error tracking during development.

### Changed

- Split the app into Data, Domain and Presentation layers with MVVM view models, and added `@app` path aliases.
- Replaced Supabase with a custom REST backend.
- Made login and registration error messages clearer.

### Fixed

- Speech recognition results on Android.
- Scoring of lines that contain numbers.
- Skip button behaviour and progress bar calculation.
- The previous-line button is disabled once a lesson ends.
- List items now have unique keys in the course lists.
- Handling of the "wrong verification code" response during registration.
- Missing (null) phone numbers and verification codes are now handled on the register and login forms.
- Expired and missing access tokens on logout.
- Keyboard types for phone and code inputs.

### Removed

- Supabase client and configuration.
- Heroku test endpoint.
- Unused font files.
- Test card data and PayTR test mode.

## 0.0.2 - 2023-03-24

### Added

- Project created with React Native CLI and TypeScript.
- ESLint, Prettier with sorted imports, Husky, lint-staged and commitlint.
- standard-version for releases.
- Pull request template.
