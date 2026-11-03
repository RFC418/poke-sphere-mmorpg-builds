const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const GODOT_PORT = 7070;

// 1. Render Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 2. Serve web client files from the repository root
app.use(express.static(__dirname));

// 3. Start the Express Web Server
app.listen(PORT, () => {
    console.log(`Web server hosting game client on port ${PORT}`);

    // 4. Launch the Godot dedicated server from the dist/ folder
    console.log('Launching Godot dedicated server backend...');
    const serverBinary = path.join(__dirname, 'dist', 'server.x86_64');
    
    const godotProcess = spawn(serverBinary, ['--headless', '--main-pack', 'server.pck', '--port', String(GODOT_PORT)], {
        cwd: path.join(__dirname, 'dist'), // Run inside dist/ so it finds server.pck easily
        stdio: 'inherit'
    });

    godotProcess.on('close', (code) => {
        console.log(`Godot server process exited with code ${code}`);
    });
});
