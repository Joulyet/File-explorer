import File from "./File";
import Directory from "./Directory";
import * as path from "path";
import * as fs from "fs";

export default class Explorer {
  root: Directory;
  currentDirectory: Directory;

  constructor(rootPath: string) {
    this.root = new Directory(rootPath);
    this.currentDirectory = this.root;
  }

  navigateToDirectory(directory: Directory): void {
    if (this.currentDirectory.contents.includes(directory)) {
      this.currentDirectory = directory;
      console.log(`Navigated to ${directory.path}`);
    } else {
      console.log(
        `Error: ${directory.path} is not a child of the current directory`
      );
    }
  }

  navigateUp(): void {
    if (this.currentDirectory.path !== this.root.path) {
      this.currentDirectory = new Directory(
        path.dirname(this.currentDirectory.path)
      );
      console.log(`Navigated to ${this.currentDirectory.path}`);
    } else {
      console.log("Error: Already at the root directory");
    }
  }

  listContents(): void {
    this.currentDirectory.listContents();
  }

  createDirectory(directoryName: string): void {
    const newDirectory = new Directory(
      path.join(this.currentDirectory.path, directoryName)
    );
    this.currentDirectory.addDirectory(newDirectory);
  }

  deleteDirectory(directory: Directory): void {
    directory.removeFile();
    this.currentDirectory.contents = this.currentDirectory.contents.filter(
      (item) => item !== directory
    );
  }

  createFile(fileName: string): void {
    const newFile = new File(path.join(this.currentDirectory.path, fileName));
    this.currentDirectory.addFile(newFile);
  }

  deleteFile(file: File): void {
    file.removeFile();
    this.currentDirectory.contents = this.currentDirectory.contents.filter(
      (item) => item !== file
    );
  }

  save(filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(this.root, null, 2));
    console.log(`Saved to ${filePath}`);
  }

  getSize(): number {
    return this.root.getSize();
  }
}
