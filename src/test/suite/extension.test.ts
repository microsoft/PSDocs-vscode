import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  test("Get extension info", () => {
    Extension.ext.info
      .then((info) => {
        assert.strictEqual("preview", info.channel);
        assert.strictEqual("0.0.1", info.version);
        assert.strictEqual("viperdan.psdocs-vscode-preview", info.id);
      })
      .catch((reason) => {
        assert.fail(`Failed to get extension info. ${reason}`);
      });
  });
});
