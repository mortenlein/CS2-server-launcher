# CS2 Server Launcher (Total Revamp)

> [!IMPORTANT]
> This application has undergone a **total revamp**! It has been transitioned from a legacy C#/.NET application to a modern, high-performance **Electron** application for a superior user experience.

## Features

- **Modern Dashboard**: A sleek, dark-themed interface built with React and Vanilla CSS.
- **Premium Aesthetics**: Features glassmorphism, smooth animations, and a dynamic map selection system.
- **One-Click Launch**: Easily configure game modes, maps, and server executables.
- **Auto-Detection**: Intelligent scanning for CS2 installations in common Steam directories.
- **Custom Map Support**: Support for workshop and custom maps with dedicated visual placeholders.
- **Custom Feedback System**: Replaced native browser alerts with a modern, non-intrusive modal system.

## Quick Start

1. **Install Dependencies**: `npm install`
2. **Run in Development**: `npm run dev`
3. **Build for Production**: `npm run build`

## Project Structure (Cleaned Up)

- `src/main`: Electron main process (IPC handlers, window management).
- `src/preload`: IPC bridge and API exposure.
- `src/renderer`: React-based frontend and assets.
- `out/`: Build artifacts.

---
*Revamped with ❤️ by Antigravity*
