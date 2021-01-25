const { PythonShell } = require("python-shell");
const path = require("path");


  
exports.getProblem = (p_id) => {
    return new Promise(function(resolve, reject) {
        console.log('getProblem')
        let options = {
            scriptPath: path.join(__dirname),
            pythonPath: 'python',
            mode: 'text',
            pythonOptions: ['-u'],
            args: [p_id]
          
          };
          try{
            PythonShell.run('getProblem.py', options, (err,data) => {
                resolve(JSON.parse(data))
            })
            
          }catch(e){
              console.log(e)
          }
    
    })
   

}