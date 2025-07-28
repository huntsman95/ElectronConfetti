# Development Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode**:
   ```bash
   npm start
   ```

3. **Add a video file**:
   - Place a video file named `overlay.mp4`, `overlay.webm`, or `overlay.mov` in the `video/` directory
   - The app will automatically detect and play the video

## Development Features

- **Hot reload**: Restart the app to see changes
- **Console logging**: Check terminal output for debugging information
- **Error handling**: App will display error messages if video fails to load

## Testing

To test the application:

1. Run `npm start` without any video files to see error handling
2. Add a sample video file to test playback
3. Press Escape during playback to test manual exit
4. Let video play to completion to test auto-exit

## Building for Production

```bash
# Install electron-builder for packaging
npm install electron-builder --save-dev

# Build distributable
npm run dist
```

## Troubleshooting

- **App won't start**: Check that Electron is installed (`npm install`)
- **Video won't play**: Ensure video file is in correct format and location
- **Transparency issues**: Test on different desktop backgrounds
- **Performance**: Try smaller video files or different codecs
