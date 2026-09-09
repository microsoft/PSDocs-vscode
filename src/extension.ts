// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { execFile } from "child_process";
import path = require("path");
import * as vscode from "vscode";
import { createPSDocsInvocation } from "./psdocsInvocation";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vicperdana.psdocs-vscode-preview",
    function () {
      var currentlyOpenFilePath =
        vscode.window.activeTextEditor?.document.uri.fsPath;

      var templatePath = "";
      var outputPath = "";
      var templateFolderPath = "";
      let options: vscode.InputBoxOptions = {
        prompt: "Full path to the ARM template: ",
        value: `${currentlyOpenFilePath}`,
      };

      vscode.window.showInputBox(options).then((value) => {
        if (!value) return;
        templatePath = value;
        templateFolderPath = path.dirname(templatePath);
        let options: vscode.InputBoxOptions = {
          prompt:
            "Output Path of the Markdown (relative path from the ARM template file): ",
          value: "out\\docs\\",
        };
        vscode.window.showInputBox(options).then((value) => {
          if (!value) return;
          outputPath = value;

          const outputDirectoryPath = path.join(
            templateFolderPath,
            outputPath
          );
          const invocation = createPSDocsInvocation(
            templatePath,
            outputDirectoryPath
          );

          execFile(
            invocation.file,
            invocation.args,
            invocation.options,
            (error, _stdout, stderr) => {
              const message = stderr || error?.message || "";
              if (message !== "") {
                vscode.window.showErrorMessage(message);
              } else {
                vscode.window.showInformationMessage(
                  `Markdown generated in ${outputDirectoryPath}`
                );
              }
            }
          );
        });
      });
    }
  );
}

export function deactivate() {}
