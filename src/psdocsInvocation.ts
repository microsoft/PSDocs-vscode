import type { ExecFileOptionsWithStringEncoding } from "child_process";

export const PSDOCS_TEMPLATE_PATH_ENV = "PSDOCS_VSCODE_TEMPLATE_PATH";
export const PSDOCS_OUTPUT_PATH_ENV = "PSDOCS_VSCODE_OUTPUT_PATH";

const PSDOCS_COMMAND =
  "Import-Module PSDocs.Azure; Invoke-PSDocument -Module PSDocs.Azure -InputObject $env:PSDOCS_VSCODE_TEMPLATE_PATH -OutputPath $env:PSDOCS_VSCODE_OUTPUT_PATH;";

export interface PSDocsInvocation {
  file: string;
  args: string[];
  options: ExecFileOptionsWithStringEncoding;
}

export function createPSDocsInvocation(
  templatePath: string,
  outputPath: string
): PSDocsInvocation {
  return {
    file: "pwsh",
    args: ["-Command", PSDOCS_COMMAND],
    options: {
      encoding: "utf8",
      env: {
        ...process.env,
        [PSDOCS_TEMPLATE_PATH_ENV]: templatePath,
        [PSDOCS_OUTPUT_PATH_ENV]: outputPath,
      },
      shell: false,
    },
  };
}
