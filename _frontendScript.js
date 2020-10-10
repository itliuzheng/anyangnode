const { execSync } = require('child_process');
const path = require('path')
const fs = require('fs')

function runSync(code) {
    console.log(code);
    execSync(code,{
        cwd:path.resolve(__dirname,'./backend'),
        encoding:'utf8',
        maxBuffer: 1024 * 2000
    });
}

let arguments = process.argv.splice(2)
console.log(arguments);

if(arguments && arguments[0] == 'build'){
    runSync('npm run build')
}
if(fs.existsSync(path.resolve(__dirname,'./views/_admin')))runSync(`rmdir /s/q ${path.resolve(__dirname,'./views/_admin')}`)
if(fs.existsSync(path.resolve(__dirname,'./_static')))runSync(`rmdir /s/q ${path.resolve(__dirname,'./_static')}`)

if(!fs.existsSync(path.resolve(__dirname,'./views/_admin'))) runSync(`mkdir ${path.resolve(__dirname,'./views/_admin')}`)
if(!fs.existsSync(path.resolve(__dirname,'./_static'))) runSync(`mkdir ${path.resolve(__dirname,'./_static')}`)

runSync(`copy ${path.resolve(__dirname,'./backend/dist/index.html')} ${path.resolve(__dirname,'./views/_admin/')}`)
runSync(`xcopy ${path.resolve(__dirname,'./backend/dist/_static/')} ${path.resolve(__dirname,'./_static/')} /s /f /h`)

