const { exec,execSync ,execFileSync } = require('child_process');
const path = require('path')
const fs = require('fs')

function run(code) {
    return new Promise(function(resolve, reject) {
        console.log(code);
        exec(code,{
            cwd:path.resolve(__dirname,'./backend'),
            encoding:'utf8',
            maxBuffer: 1024 * 2000
        }, function(err, stdout, stderr) {
            if (err) {
                console.log(err);
                reject(err);
            } else if (stderr.lenght > 0) {
                reject(new Error(stderr.toString()));
            } else {
                console.log(stdout.toString());
                resolve();
            }
        });
    })
}
function runSync(code) {
    console.log(code);
    execSync(code,{
        cwd:path.resolve(__dirname,'./backend'),
        encoding:'utf8',
        maxBuffer: 1024 * 2000
    });
}

// run('npm run build')

// if(fs.existsSync(path.resolve(__dirname,'./views/_admin'))){
//     console.log('该路径已存在');
//     run(`rmdir /s/q ${path.resolve(__dirname,'./views/_admin')}`)
//         .then(()=>{
//             return run(`mkdir ${path.resolve(__dirname,'./views/_admin')}`)
//         })
//         .then(function () {
//             return run(`mkdir ${path.resolve(__dirname,'./views/_admin/static')}`)
//         })
// }else{
//     console.log('该路径不存在');
//     run(`mkdir ${path.resolve(__dirname,'./views/_admin')}`)
//     .then(function () {
//         return run(`mkdir ${path.resolve(__dirname,'./views/_admin/static')}`)
//     })
// }
//
//
// run(`copy ${path.resolve(__dirname,'./backend/dist/index.html')} ${path.resolve(__dirname,'./views/_admin')}`)
//     .then(function () {
//         return run(`xcopy ${path.resolve(__dirname,'./backend/dist/static')} ${path.resolve(__dirname,'./views/_admin/static')} /s /f /h`)
//     })



if(fs.existsSync(path.resolve(__dirname,'./views/_admin'))){
    console.log('该路径已存在');
    runSync(`rmdir /s/q ${path.resolve(__dirname,'./views/_admin')}`)
    runSync(`mkdir ${path.resolve(__dirname,'./views/_admin')}`)
    runSync(`mkdir ${path.resolve(__dirname,'./views/_admin/static')}`)
}else{
    console.log('该路径不存在');
    runSync(`mkdir ${path.resolve(__dirname,'./views/_admin')}`)
    runSync(`mkdir ${path.resolve(__dirname,'./views/_admin/static')}`)
}

runSync(`copy ${path.resolve(__dirname,'./backend/dist/index.html')} ${path.resolve(__dirname,'./views/_admin')}`)
runSync(`xcopy ${path.resolve(__dirname,'./backend/dist/static')} ${path.resolve(__dirname,'./views/_admin/static')} /s /f /h`)

