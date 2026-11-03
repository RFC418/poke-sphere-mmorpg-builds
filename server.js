const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const GODOT_PORT = 7070;

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Web server hosting game client on port ${PORT}`);

    console.log('Launching Godot dedicated server backend...');
    const serverBinary = path.join(__dirname, 'dist', 'server.x86_64');
    
    // Clean spawn call without --main-pack
    const godotProcess = spawn(serverBinary, ['--headless', '--port', String(GODOT_PORT)], {
        cwd: path.join(__dirname, 'dist'),
        stdio: 'inherit'
    });

    godotProcess.on('close', (code) => {
        console.log(`Godot server process exited with code ${code}`);
    });
});
