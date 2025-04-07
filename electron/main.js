import path from 'path';
import { app, BrowserWindow } from 'electron';

const isDev = process.env.IS_DEV === 'true';

const createWindow = () => {
    const __dirname = path.resolve(path.dirname(''));

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/electron/preload.js'),
            nodeIntegration: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:5173'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    )

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
