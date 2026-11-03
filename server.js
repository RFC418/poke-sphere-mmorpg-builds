const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const GODOT_PORT = 7070;

// 1. Render Health Check Endpoint (Fixes the crash loop!)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 2. Serve your Godot HTML5 web client files statically
app.use(express.static(path.join(__dirname, 'dist')));

// 3. Start the Express Web Server
app.listen(PORT, () => {
    console.log(`Web server hosting game client on port ${PORT}`);

    // 4. Launch the Godot Headless Server binary as a child process
    console.log('Launching Godot dedicated server backend...');
    const godotProcess = spawn(path.join(__dirname, 'dist', 'server.x86_64'), ['--headless', '--port', String(GODOT_PORT)], {
        stdio: 'inherit'
    });

    godotProcess.on('close', (code) => {
        console.log(`Godot server process exited with code ${code}`);
    });
});
