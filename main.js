const { app, BrowserWindow, screen, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// Add command line switches to improve performance and composition
app.commandLine.appendSwitch('enable-transparent-visuals');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

let mainWindow;

// Parse command line arguments for text message
function parseCommandLineArgs() {
  // Get all arguments
  const allArgs = process.argv;
  console.log('Full process.argv:', allArgs);
  
  let textMessage = '';
  let showVideo = true;
  
  // Search through ALL arguments for our flags
  for (let i = 0; i < allArgs.length; i++) {
    const arg = allArgs[i];
    console.log(`Checking arg ${i}: "${arg}"`);
    
    if (arg === '--text' && i + 1 < allArgs.length) {
      textMessage = allArgs[i + 1];
      showVideo = false;
      console.log('Found --text with message:', textMessage);
      break;
    } else if (arg === '--text-with-video' && i + 1 < allArgs.length) {
      textMessage = allArgs[i + 1];
      showVideo = true;
      console.log('Found --text-with-video with message:', textMessage);
      break;
    } else if (arg.startsWith('--text=')) {
      textMessage = arg.substring(7);
      showVideo = false;
      console.log('Found --text= with message:', textMessage);
      break;
    } else if (arg.startsWith('--text-with-video=')) {
      textMessage = arg.substring(19);
      showVideo = true;
      console.log('Found --text-with-video= with message:', textMessage);
      break;
    }
  }
  
  console.log('Final config:', { textMessage, showVideo });
  return { textMessage, showVideo };
}

const { textMessage, showVideo } = parseCommandLineArgs();

function createWindow() {
  // Get the primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create the browser window with transparent overlay properties
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: true,
    focusable: false,
    show: false,
    acceptFirstMouse: false,
    disableAutoHideCursor: false,
    enableLargerThanScreen: true,
    hasShadow: false,
    opacity: 0.99, // Slightly less than 1 to help with composition
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      backgroundThrottling: false,
      offscreen: false
    }
  });

  // Load the video overlay page
  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Use a slightly different approach for always on top
    mainWindow.setAlwaysOnTop(true, 'floating', 1);
    // Don't use setFullScreen as it can interfere with desktop composition
    mainWindow.maximize();
    // Allow desktop to continue rendering
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent window from being focused
  mainWindow.on('focus', () => {
    mainWindow.blur();
  });
}

// Handle requests for overlay configuration
ipcMain.on('get-overlay-config', (event) => {
  event.reply('overlay-config', {
    textMessage: textMessage,
    showVideo: showVideo
  });
});

// Handle video ended event from renderer
ipcMain.on('video-ended', () => {
  console.log('Video playback completed, exiting application...');
  app.quit();
});

// Handle video error event from renderer
ipcMain.on('video-error', (event, error) => {
  console.error('Video playback error:', error);
  app.quit();
});

// Handle mouse event pass-through control
ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(ignore, { forward: true });
  }
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  
  // Register global shortcut for Escape key as fallback
  globalShortcut.register('Escape', () => {
    console.log('Global Escape key pressed, exiting...');
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('escape-pressed');
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Unregister all global shortcuts
  globalShortcut.unregisterAll();
  
  // On macOS it is common for applications to stay open until explicitly quit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window when clicking the dock icon
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all global shortcuts when app is about to quit
  globalShortcut.unregisterAll();
});

// Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Security: Prevent navigation
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    event.preventDefault();
  });
});
