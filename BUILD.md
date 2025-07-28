# Video Overlay - Build Instructions

## How to Compile as an EXE

You have several options for creating an executable:

### Option 1: Simple Packaging (Recommended)
```bash
npm run package-win
```
This creates a directory at `build/VideoOverlay-win32-x64/` containing:
- `VideoOverlay.exe` - The main executable
- All required DLLs and dependencies
- You can zip this entire folder for distribution

### Option 2: Using electron-builder (Advanced)
```bash
npm run dist
```
Note: This might require administrator privileges or running PowerShell as Administrator due to Windows UAC restrictions.

## What You Get

After running `npm run package-win`, you'll find:
- **Location**: `build/VideoOverlay-win32-x64/VideoOverlay.exe`
- **Size**: ~150MB (includes Chromium runtime)
- **Dependencies**: All files in the folder are required
- **Portability**: The entire folder can be copied to other Windows machines

## Usage of the EXE

### Basic Video Overlay
```bash
VideoOverlay.exe
```

### Text Overlay
```bash
VideoOverlay.exe --text "Your Message Here"
```

### Text with Video Background
```bash
VideoOverlay.exe --text-with-video "Your Message Here"
```

## Distribution

To distribute your app:

1. Run `npm run package-win`
2. Zip the entire `build/VideoOverlay-win32-x64/` folder
3. Users extract and run `VideoOverlay.exe`
4. Make sure to include the `video/` folder with video files if needed

## File Structure for Distribution
```
VideoOverlay-win32-x64/
├── VideoOverlay.exe          # Main executable
├── video/                    # Video files directory
│   ├── overlay.mp4          # Your video files
│   └── README.md            # Video instructions
├── chrome_100_percent.pak   # Required runtime files
├── chrome_200_percent.pak
├── ffmpeg.dll
├── libEGL.dll
├── libGLESv2.dll
└── ... (other runtime files)
```

## Notes

- The executable is about 150MB because it includes the entire Chromium browser engine
- All files in the build directory are required for the app to run
- The app will work on any Windows 10/11 machine without requiring Node.js or npm
- For smaller file sizes, consider using online video streaming instead of local files

## Troubleshooting Command Line Arguments

If command line arguments like `--text` and `--text-with-video` don't work:

### 1. Test Scripts
Run the included test scripts to verify functionality:
```bash
test-all.bat          # Comprehensive tests
quick-test.bat         # Quick test with sample messages
```

### 2. Debug Build
Create a debug build to see console output:
```bash
npm run package-win-debug
```

### 3. Argument Format Examples
```bash
# Supported formats:
VideoOverlay.exe --text "Your message here"
VideoOverlay.exe --text="Your message here"
VideoOverlay.exe --text-with-video "Your message here"
VideoOverlay.exe --text-with-video="Your message here"
```

### 4. Common Issues
- **Quotes required**: Use quotes around messages with spaces
- **Path issues**: Run from the correct directory or use full paths
- **File locks**: Close any running instances before rebuilding

### 5. Testing in Development
Test arguments work in development mode first:
```bash
npm start -- --text "Test message"
npm start -- --text-with-video "Test with video"
```

If they work in development but not in the EXE, the issue is with the packaging process.
