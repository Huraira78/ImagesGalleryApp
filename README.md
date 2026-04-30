# PixelGallery: React Native Assessment

## Overview
PixelGallery is a beautifully designed, high-performance Image Gallery application built with React Native. It demonstrates modern architectural patterns, robust state management, GraphQL integration, and smooth UI animations, providing a premium user experience from launch to hardware interaction.

---

## 🚀 How to Run the App

Follow these simple steps to compile and run the application on your local machine.

### Prerequisites
- Node.js installed on your machine.
- Java Development Kit (JDK) installed.
- Android Studio and Android SDK configured.

### 1. Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### 2. Start the Metro Bundler
Start the React Native bundler in a dedicated terminal window:
```bash
npx react-native start
```

### 3. Run the Android App
Open a second terminal window in the project root and execute the build command:
```bash
npx react-native run-android
```
*(Note: Because this project includes custom Native Kotlin Modules, the Android project must be fully compiled. Pressing "a" in the Metro bundler without a native build will not work for the first run.)*

---

## Features & Functionality

### 1. Registration & Authentication
- **Secure Onboarding:** A stunning, animated welcome flow leads users into a registration sheet.
- **Form Validation:** Strict input validation ensures that names, passwords, emails (standard format), and phone numbers (exactly 10 digits, numbers only) are correctly formatted before allowing access.
- **Error Handling:** Clear, user-friendly error messages and toast notifications guide the user to correct any mistakes.

### 2. Image Gallery
- **Dynamic Grid Layout:** Images are elegantly displayed in a responsive, two-column grid.
- **GraphQL Integration:** Image data is fetched using Apollo Client via a mocked GraphQL endpoint.
- **Pull-to-Refresh:** Users can pull down on the gallery to fetch and shuffle a fresh set of images.
- **Persistent Interactions:** Users can "Like" images. The like count and status are securely managed by Redux and persist locally even when the gallery is refreshed.

### 3. Image Details & Animations
- **Immersive Details:** Tapping any image seamlessly transitions the user to a full-screen view containing the author, description, and total likes.
- **Fluid Animations:**
  - **Image Zoom:** The image gracefully springs and zooms into view upon opening the details screen.
  - **Interactive Likes:** Tapping the like button triggers a playful, bouncing heart animation, immediately updating the like count.

### 4. Hardware Integration (Native Bridge)
- **Device Information:** A custom Native Android Module allows the app to communicate directly with the phone's hardware. By tapping the settings icon in the gallery, users can view their specific device model, manufacturer, brand, and Android SDK version.

### 5. UI & Branding Polish
- **Custom App Branding:** The default Android robot icon has been fully replaced with a custom, high-quality camera vector logo set against a vibrant coral-red gradient, perfectly matching the app's internal color scheme.
- **Modern Loading States:** Instead of standard loading spinners, the gallery utilizes a beautiful, custom animated skeleton layout that pulses seamlessly while fetching data from the API.

---

## Technical Stack
- **Framework:** React Native (0.85+)
- **State Management:** Redux Toolkit
- **API Integration:** Apollo Client (GraphQL)
- **Navigation:** React Navigation (Native Stack)
- **Animations:** React Native Animated API

---

## Architecture Note: Native Bridge Implementation

When implementing the Native Module for extracting device information, the standard asynchronous bridge (`ReactContextBaseJavaModule`) was selected over the newer JSI (JavaScript Interface) or TurboModules architecture. 

**Why this decision was made:**
The core requirement of this feature is to securely fetch a small amount of hardware text data (like the device model) exactly once when the screen opens. 

While modern JSI and TurboModules are incredible for features that require heavy, continuous communication (like 60fps video processing or real-time complex animations), they require an overhead process called C++ Codegen to run. By using the highly stable, standard asynchronous bridge, we ensure that:
1. The codebase remains extremely clean, lightweight, and easy to read.
2. The application is guaranteed to compile and build flawlessly on any reviewer's machine without requiring complex C++ environment configurations.

The current implementation perfectly balances high performance with rock-solid reliability.
