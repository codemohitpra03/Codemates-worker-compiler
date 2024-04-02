const { spawn } = require("child_process");

// const ls = spawn("dir",["*.js"], {shell: true});

const run_command = (...command) =>{
    let p = spawn(command[0], command.slice(1),{shell: true});
    return new Promise((resolve) => {
        p.stdout.on("data", (x) => {
          process.stdout.write(x.toString());
        //   console.log(x.toString());
          resolve(x.toString())
        });
        p.stderr.on("data", (x) => {
          process.stderr.write(x.toString());
          resolve(x.toString())
        });
        p.on("exit", (code) => {
            resolve(code);
            console.log("command execution exit code ",code);
        });
    })
}

async function write_to_file(lang,src_code){
    await run_command(`sudo tee  > ./source_codes/${lang}/${lang}_source.${lang === "python" ? "py" : lang} << EOT ${src_code}`);
    console.log("done");
    // console.log("This must happen first.");
}
async function write_to_in_file(lang,input){
    await run_command(`sudo tee  > ./source_codes/${lang}/input.txt << EOT ${input}`);
    console.log("done");
    // console.log("This must happen first.");
}

async function executeJavaCode(){
    //please make your main class as java_source
    await run_command("javac", "-d .", "./source_codes/java/java_source.java");
    const output = await run_command("java", "java_source < ./source_codes/java/input.txt");
    return output
}
async function executeCppCode(){

    await run_command("g++","-o cpp_source ./source_codes/cpp/cpp_source.cpp");
    const output = await run_command("./cpp_source","< ./source_codes/cpp/input.txt"); //linux
    // const output = await run_command("cpp_source"); //windows
    // console.log(output,"this is output");
    return output
    
}

async function executePythonCode(){
    
    const output = await run_command("python3","./source_codes/python/python_source.py < ./source_codes/python/input.txt"); //linux
    // const output = await run_command("python","./source_codes/python/python_source.py"); //windows
    console.log(output,"this is output");
    return output
    // console.log("This must happen last.");
}
async function executeNodejsCode(){
    
    const output = await run_command("node","./source_codes/js/js_source.js");
    return output
    
    
}

module.exports = {
    write_to_file,
    write_to_in_file,
    executeJavaCode,
    executeCppCode,
    executePythonCode,
    executeNodejsCode
}