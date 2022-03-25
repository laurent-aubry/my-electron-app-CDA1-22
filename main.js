const { app, BrowserWindow, Menu, ipcMain, nativeImage, Tray } = require('electron')

// include the Node.js 'path' module at the top of your file
const path = require('path')

const isMac = process.platform === 'darwin'

let mainWindow;
let addWindow;
let tray;
const initialData = [{todo: "task to do"}, {todo: "task 2 to do"}];

const createWindow = () => {
  mainWindow = new BrowserWindow
    (
      {
        height: 500,
        width: 700,
        frame: true, // désactive la Status Bar en haut de la fenêtre
        resizable: true, // fige la taille de la fenêtre ainsi que son emplacement
        show: false, // désactive l'ouverture par défaut de la fenêtre principale et n'active que l'icône TRAY
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
          // backgroundThrottling: false // permet au timer du Tray de continuer à tourner (normalement) lorsque App n'est pas focus
        }
      })

  mainWindow.loadFile('index.html')
  mainWindow.on('ready-to-show', () => {
    mainWindow.webContents.send("initData", initialData);
  })
}

const onClick = (event, bounds) => {
  // console.log(bounds.x, bounds.y);
  // Recherche de l'emplacement de la barre de menu (Windows et Mac + si l'utilisateur a personnalisé l'emplacement)
  const { x, y } = bounds;
  const { height, width } = mainWindow.getBounds();

  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const yPosition = process.platform === 'darwin' ? y : y - height;
    mainWindow.setBounds({
      x: x - width / 2,
      y: yPosition,
      height,
      width
    })
    mainWindow.show();
  }
}

const onRightClick = () => {
  const menuConfig = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ]);
  tray.popUpContextMenu(menuConfig); // on passe le menu à la popup contextuelle
}

app.whenReady().then(() => {
  
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })

  !isMac && mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./assets/${iconName}`);

  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon);
  tray.setToolTip('Greta App');
  tray.setTitle('Greta Application');

  tray.on('click', onClick.bind(tray));
  tray.on('right-click', onRightClick.bind(tray)) //bind(this) permet de passer le contexte de l'objet à la fonction lorsqu'elle sera appelé. Actuellement ce n'est qu'un poiteur qui enregistre la fonction

})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})





function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Ajouter une nouvelle tâche",
    // frame: false, // désactive la Status Bar en haut de la fenêtre
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close', accelerator: "Command+Q" } : { role: 'quit', accelerator: "Ctrl+Q" },
      {
        label: "Nouvelle tâche",
        click() { createAddWindow(); }
      },
      {
        label: "Réinitialiser la liste",
        click() {
          mainWindow.webContents.send("todo:clear");
        }
      }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

