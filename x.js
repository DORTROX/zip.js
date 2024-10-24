import {BlobWriter, configure, TextReader, ZipWriter} from "./index.js"


configure({ maxWorkers: 4 });
await Promise.all(
  Array.from({ length: 5 }, async (_, index) => {
    const zipWriter = new ZipWriter(new BlobWriter());
    await zipWriter.add("hello.txt", new TextReader("hello world"));
    console.log(index, await zipWriter.close());
  })
);
