const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('cd ~/domains/$USER.serv00.net/vless && ./check_vless.sh', (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: process.env.SSH_HOST,
    port: 22,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASS
});
