const { exec } = require("child_process");

exec("postgres -D /usr/local/var/postgres", (error, stdout, stderr) => {
    if (error) {
        const message = error.message;
        let mySubString = message.substring(
            message.lastIndexOf("(") + 1, 
            message.lastIndexOf(")")
        );

        let PID = +mySubString.split(' ')[1];
        exec(`kill -9 ${PID}; brew services restart postgresql`, (err, stdo, stder) => {
            if (err) {
                console.log('errr', err)
                return;
            }

            if (stder) {
                console.log(`stder---: ${stder}`);
                return;
            }
            console.log('stdo---', stdo);
        })
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
