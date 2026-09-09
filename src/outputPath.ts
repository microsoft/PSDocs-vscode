// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import path = require("path");

export function resolveOutputDirectoryPath(
  templateFolderPath: string,
  outputPath: string
): string | undefined {
  if (path.isAbsolute(outputPath)) {
    return undefined;
  }

  const templateDirectoryPath = path.resolve(templateFolderPath);
  const outputDirectoryPath = path.resolve(templateDirectoryPath, outputPath);
  const relativeOutputPath = path.relative(
    templateDirectoryPath,
    outputDirectoryPath
  );

  if (
    relativeOutputPath === ".." ||
    relativeOutputPath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeOutputPath)
  ) {
    return undefined;
  }

  return outputDirectoryPath;
}
