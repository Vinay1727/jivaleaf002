# Mobile App Conversion Guide (Android)

Your project has been successfully set up with **Capacitor** to run as a native Android app.

## ✅ What I Have Done
1. Installed Capacitor core, CLI, and Android platform.
2. Initialized the project as `com.jeevaleaf.app`.
3. Built the React project and synced it with the Android platform.
4. Added new scripts to `package.json` for easy management.

---

## 🚀 How to Build the APK (Your Steps)

Since I cannot open graphical interfaces on your computer, you need to perform the final build steps:

### 1. Install Android Studio (If not installed)
Download and install [Android Studio](https://developer.android.com/studio).
- During installation, ensure **Android SDK** and **Android Virtual Device** are selected.

### 2. Open the Project
Open your integrated terminal (VS Code) and run:
```bash
npm run open-android
```
*(Or manually open the `android` folder inside `NEWPLANT` using Android Studio)*

### 3. Run the App
- In Android Studio, wait for Gradle sync to finish (bottom bar).
- Connect your Android phone via USB (Enable USB Debugging) OR create an Emulator.
- Click the **Green Play Button (▶)** in the top toolbar.

### 4. Build APK for Sharing
To create an installable file (`.apk`) to send to friends:
- Go to menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Once done, a popup will appear. Click **locate** to find the `app-debug.apk` file.
- You can rename this file and share it!

---

## 🔄 How to Update the App
If you make changes to your React code (e.g., fix a bug):

1. **Run this single command:**
   ```bash
   npm run mobile
   ```
   *(This rebuilds your website and updates the Android code automatically)*

2. **Run in Android Studio:**
   - Click "Apply Changes" or "Run" again in Android Studio to see the new version on your phone.

---

## 🎨 Changing App Icon & Splash Screen
To replace the default Capacitor logo:
1. create a folder `assets` in the root (if not exists).
2. Add your `icon.png` (1024x1024) and `splash.png` (2732x2732) there.
3. Install the asset tool: `npm install @capacitor/assets --save-dev`
4. Run: `npx capacitor-assets generate --android`
