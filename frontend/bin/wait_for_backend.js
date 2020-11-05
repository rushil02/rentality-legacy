let http = require('http')

const options = {
    host: 'web',
    port: 8000,
    path: '/'
};

function sleep(ms) {
    console.log(`Sleeping ... (${ms/1000})`)
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    let waiting = true
    let wait_time = 500
    do {
        http.get(options, function (res) {
            if (res.statusCode === 200) {
                waiting = false
                console.log("Backend service is available!");
            } else {
                waiting = false
                console.log(res)
            }
        }).on('error', function (e) {
            console.log("Backend Service is not reachable yet : " + e.message);
        });
        await sleep(wait_time)
        wait_time = wait_time <= 5000 ? wait_time + 500 : wait_time
    } while (waiting)
    return 0
}

main().then(res => {console.log("Continue to execution ...")})