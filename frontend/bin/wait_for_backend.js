let http = require('http')

const options = {
    host: 'web',
    port: 8000,
    path: '/'
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    let waiting = true
    do {
        http.get(options, function (res) {
            if (res.statusCode === 200) {
                waiting = false
                console.log("Backend service is available!");
            }
        }).on('error', function (e) {
            console.log("Backend Service is not reachable yet : " + e.message);
        });
        console.log("Sleeping ... (3)")
        await sleep(3000)
    } while (waiting)
}

main().then(console.log("Continue to execution ..."))