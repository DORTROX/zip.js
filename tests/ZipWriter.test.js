import { ZipWriter, TextReader, BlobWriter, configure } from "../index.js";
import assert from "assert";
import { describe, test } from "node:test";

describe("ZipWriter Tests with maxWorkers = 4", function () {
  test("Should process all 5 zip files when maxWorkers is set to 4", async function () {
    configure({ maxWorkers: 4 });

    let successCount = 0;
    let failed = false;

    try {
      await Promise.all(
        Array.from({ length: 5 }, async (_, index) => {
          const zipWriter = new ZipWriter(new BlobWriter());
          await zipWriter.add("hello.txt", new TextReader("hello world"));
          console.log(index, await zipWriter.close());
          successCount++;
        })
      );
    } catch (error) {
      console.error("Error encountered during zip writing:", error);
      failed = true;
    }

    // Check if all 5 files were successfully processed
    if (successCount === 5) {
      console.log("Test passed: All 5 files were processed.");
    } else {
      assert.fail(
        `Test failed: Only ${successCount} files were processed. Expected all 5 files to be processed.`
      );
    }
  });
});
