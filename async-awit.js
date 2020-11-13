let fs = require('fs').promises

async function read (){
    let content = await fs.readFile('./name.txt', 'utf-8')
    let age = await fs.readFile(content, 'utf-8')
    return age
}

read().then(data=>{
    console.log(data)
})