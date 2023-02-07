import * as path from "path";
import * as fs from "fs";

export default class File {
  name: string;
  extension: string;
  size: number;
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  readFile(): string {
    return fs.readFileSync(this.path, "utf8");
  }

  writeFile(content: string): void {
    fs.writeFileSync(this.path, content);
  }

  createFile(): void {
    fs.writeFileSync(this.path, "");
  }

  removeFile(): void {
    fs.rm(this.path, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${this.path} is deleted!`);
    });
  }

  getSize(): number {
    const stats = fs.statSync(this.path);
    return stats.size;
  }

  getExtension(): string {
    return this.path.split(".").pop();
  }

  getName(): string {
    return path.basename(this.path, `.${this.getExtension()}`);
  }
}
