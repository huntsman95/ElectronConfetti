<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Video Overlay Electron App - Copilot Instructions

This is an Electron.js application that creates a fullscreen transparent video overlay on the desktop.

## Project Structure
- `main.js`: Main Electron process handling window creation and IPC communication
- `index.html`: Renderer process with video playback interface
- `video/`: Directory for video files (overlay.mp4, overlay.webm, overlay.mov)
- `package.json`: Node.js configuration with Electron dependencies

## Key Features
- Transparent fullscreen overlay window
- Auto-exit when video playback completes
- Multiple video format support (MP4, WebM, MOV)
- Always-on-top behavior
- Escape key exit functionality
- Error handling and user feedback

## Development Guidelines
- Use IPC communication between main and renderer processes
- Maintain window transparency and always-on-top behavior
- Handle video events properly (ended, error, timeupdate)
- Follow Electron security best practices
- Test with various video formats and edge cases

## Code Style
- Use modern ES6+ JavaScript syntax
- Include comprehensive error handling
- Add console logging for debugging
- Use semantic HTML and CSS for the interface
- Follow Electron's recommended architecture patterns
