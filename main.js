process.env.GOOGLE_API_KEY = 'AIzaSyCDzsgS_zolldUbXHKd4OjCefLZNXCPGeA'
const {app, BrowserWindow} = require('electron');


function createWindow(){
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/img/weatherIcon.jpeg',
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load index.html
    window.loadFile('index.html');

    // Open devtools
    window.webContents.openDevTools();

    window.on('closed', ()=> {
        window = null;
    })
    //testing location services
    
}

// Run create window function
app.on('ready', createWindow)

app.on('window-all-closed', ()=> {
    if(process.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', ()=>{
    if(window == null) {
        createWindow()
    }
})

