import File from "./File";
import * as path from "path";
import * as fs from "fs";

export default class Directory extends File {
  contents: (File | Directory)[];

  constructor(path: string) {
    super(path);
    this.contents = [];

    if (fs.existsSync(this.path)) {
      this.scan();
    }
  }

  addFile(file: File): void {
    fs.writeFileSync(file.path, "");
    this.contents.push(file);
  }

  addDirectory(directory: Directory): void {
    fs.mkdirSync(directory.path);
    this.contents.push(directory);
  }

  listContents(): void {
    if (this.contents.length === 0) {
      console.log("This directory is empty");
      return;
    }
    console.log(this.contents);
  }

  getSize(): number {
    return fs.statSync(this.path).size;
  }

  scan(): void {
    const items = fs.readdirSync(this.path);

    for (const item of items) {
      const itemPath = path.join(this.path, item);
      if (fs.statSync(itemPath).isFile()) {
        this.contents.push(new File(itemPath));
      } else if (fs.statSync(itemPath).isDirectory()) {
        this.contents.push(new Directory(itemPath));
      }
    }
  }
}
