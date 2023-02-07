import File from "./src/File";
import Directory from "./src/Directory";
import Explorer from "./src/Explorer";
import Console from "./src/Console";
import * as path from "path";

const myDirectory = new Directory('./test');
const explorer = new Explorer(myDirectory.path);
const console = new Console(explorer);
console.start();