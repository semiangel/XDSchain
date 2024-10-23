const os = require('os');

// This function returns the first local IPv4 address it finds (like "192.168..." or "10...")
function getLocalIPAddress() {
    const networkInterfaces = os.networkInterfaces();

    for (const interface of Object.values(networkInterfaces)) {
        for (const config of interface) {
            // Check if the IP is a local IPv4 address (not internal like 127.0.0.1)
            if (config.family === 'IPv4' && !config.internal &&
                (config.address.startsWith('192.168') || config.address.startsWith('10.'))) {
                return config.address;
            }
        }
    }

    // Return null if no local IP is found (you could also choose to return a default value)
    return null;
}

// Assigning the local IP address to thisMachineIP
const thisMachineIP = getLocalIPAddress();
console.log(`This machine's local IP Address is: ${thisMachineIP}`);
