import Explorer from "./Explorer";
import Directory from "./Directory";

export default class Console {
  explorer: Explorer;

  constructor(explorer: Explorer) {
    this.explorer = explorer;
  }

  start(): void {
    console.log(
      `Entering console mode. Type 'help' for a list of available commands.`
    );
    process.stdout.write(`${this.explorer.currentDirectory.path} $ `);
    process.stdin.on("data", (data: Buffer) => {
      const input = data.toString().trim();
      const [command, ...args] = input.split(" ");
      switch (command) {
        case "cd":
          this.handleCD(args[0]);
          break;
        case "ls":
          this.handleLS();
          break;
        case "mkdir":
          this.handleMKDIR(args[0]);
          break;
        case "rmdir":
          this.handleRMDIR(args[0]);
          break;
        case "touch":
          this.handleTOUCH(args[0]);
          break;
        case "rm":
          this.handleRM(args[0]);
          break;
        case "help":
          this.handleHELP();
          break;
        case "save":
          this.handleSAVE();
        case "quit":
          this.handleQUIT();
          break;
        default:
          console.log(`Error: Unrecognized command '${command}'`);
          break;
      }
      process.stdout.write(`${this.explorer.currentDirectory.path} $ `);
    });
  }

  handleCD(directoryName: string): void {
    const directory = this.explorer.currentDirectory.contents.find(
      (item) => item.getName() === directoryName
    ) as Directory;
    if (directory && directory instanceof Directory) {
      this.explorer.navigateToDirectory(directory);
    } else {
      console.log(`Error: No such directory '${directoryName}'`);
    }
    if (directoryName === "..") {
      this.explorer.navigateUp();
    }
  }

  handleLS(): void {
    this.explorer.listContents();
  }

  handleMKDIR(directoryName: string): void {
    this.explorer.createDirectory(directoryName);
  }

  handleRMDIR(directoryName: string): void {
    const directory = this.explorer.currentDirectory.contents.find(
      (item) => item.getName() === directoryName
    ) as Directory;
    if (directory) {
      this.explorer.deleteDirectory(directory);
    } else {
      console.log(`Error: No such directory '${directoryName}'`);
    }
  }

  handleTOUCH(fileName: string): void {
    this.explorer.createFile(fileName);
  }
  handleRM(fileName: string): void {
    const file = this.explorer.currentDirectory.contents.find(
      (item) => item.getName() === fileName
    );
    if (file) {
      this.explorer.deleteFile(file);
    } else {
      console.log(`Error: No such file '${fileName}'`);
    }
  }

  handleSAVE(): void {
    this.explorer.save("save.json");
  }

  handleHELP(): void {
    console.log(`Available commands:
- cd <directory>: Navigate to the specified directory
- ls: List the contents of the current directory
- mkdir <directory>: Create a new directory
- rmdir <directory>: Delete a directory
- touch <file>: Create a new file
- rm <file>: Delete a file
- help: Display this help message
- save: Save the current state of the file system
- quit: Exit console mode`);
  }

  handleQUIT(): void {
    console.log("Exiting console mode");
    process.exit();
  }
}
