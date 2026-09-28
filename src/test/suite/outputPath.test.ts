import * as assert from "assert";
import path = require("path");
import { resolveOutputDirectoryPath } from "../../outputPath";

suite("PSDocs output path", () => {
  const templateFolderPath = path.resolve(
    path.parse(process.cwd()).root,
    "workspace",
    "templates"
  );

  test("allows relative paths that remain inside the template folder", () => {
    assert.strictEqual(
      resolveOutputDirectoryPath(templateFolderPath, path.join("out", "docs")),
      path.resolve(templateFolderPath, "out", "docs")
    );
    assert.strictEqual(
      resolveOutputDirectoryPath(
        templateFolderPath,
        path.join("out", "..", "docs")
      ),
      path.resolve(templateFolderPath, "docs")
    );
  });

  test("rejects paths outside the template folder", () => {
    const invalidOutputPaths = [
      path.join("..", "outside"),
      path.join("out", "..", "..", "outside"),
      path.resolve(templateFolderPath, "..", "outside"),
    ];

    for (const outputPath of invalidOutputPaths) {
      assert.strictEqual(
        resolveOutputDirectoryPath(templateFolderPath, outputPath),
        undefined
      );
    }
  });
});
