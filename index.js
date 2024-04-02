

// import { run } from "./consumer"

// run()
const { write_to_file, executeCppCode, executeJavaCode, executeNodejsCode, executePythonCode } = require("./code_runners");

const cpp_src_code = `
#include <iostream>
using namespace std;

int main(){
    int t=3;
    while(t--)cout<<"pm cpp cpp from file"<<endl;
    return 0;
}
`
const java_src_code = `
class java_source{
  public static void main(String[] args) {
      for(int i=0;i<3;i++)System.out.println("pm java from file");
  }
}
`
const js_src_code = `
let t = 3;
while (t-- > 0) {
    console.log("pm from file");
}
`
const python_src_code = `
for i in range(0,3):
    print("pm python from file")
`

async function main(){

  await write_to_file('cpp',cpp_src_code)
  await write_to_file('java',java_src_code)
  await write_to_file('js',js_src_code)
  await write_to_file('python',python_src_code)
  await executeCppCode()
  await executeJavaCode()
  await executeNodejsCode()
  await executePythonCode()
}
main()

//read output from command not file