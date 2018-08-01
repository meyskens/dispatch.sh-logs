import net from "net"
import * as logs from "./components/logs"
import * as apps from "./components/apps"


const HOST = '127.0.0.1';
const PORT = 1234;

const handleLog = async (log) => {
    log.time = new Date(log.time)
    log.size = parseInt(log.size, 10)
    log.hostname = log.hostname.replace(/^www\./,"")

    const app = await apps.getAppForDomain(log.hostname)
    if (!app) {
        return
    }
    log.app = app._id
    logs.add(log)
}

net.createServer(function(sock) {
    sock.on('data', (data) => {
        
        const entries = data.toString().split("||")

        for (let entry of entries) {
            if (!entry) {
                continue
            }
            try {
                handleLog(JSON.parse(entry))
            } catch (error) {
                console.log(error)
            }
            
        }        
    });
    
    sock.on('close', () => {})
    sock.on("error", () => {}) 
    
}).listen(PORT, HOST);


console.log('Server listening on ' + HOST +':'+ PORT);