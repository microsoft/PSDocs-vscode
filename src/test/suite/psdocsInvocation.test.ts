import * as assert from "assert";
import {
  createPSDocsInvocation,
  PSDOCS_OUTPUT_PATH_ENV,
  PSDOCS_TEMPLATE_PATH_ENV,
} from "../../psdocsInvocation";

suite("PSDocs PowerShell invocation", () => {
  test("keeps path values out of PowerShell command text", () => {
    const pathFragments = [
      "template; Write-Output injected.json",
      "template | Write-Output injected.json",
      "template & Write-Output injected.json",
      "template$(Write-Output injected).json",
      "template`Write-Output injected.json",
      "template\nWrite-Output injected.json",
      'template "quoted" value.json',
      "template with spaces.json",
    ];

    for (const pathFragment of pathFragments) {
      const templatePath = `C:\\workspace\\${pathFragment}`;
      const outputPath = `C:\\workspace\\out\\${pathFragment}`;
      const invocation = createPSDocsInvocation(templatePath, outputPath);
      const processCommand = [invocation.file, ...invocation.args].join("\0");

      assert.strictEqual(invocation.file, "pwsh");
      assert.strictEqual(invocation.options.shell, false);
      assert.strictEqual(invocation.args.length, 2);
      assert.strictEqual(invocation.args[0], "-Command");
      assert.ok(
        invocation.args[1].includes(`$env:${PSDOCS_TEMPLATE_PATH_ENV}`)
      );
      assert.ok(
        invocation.args[1].includes(`$env:${PSDOCS_OUTPUT_PATH_ENV}`)
      );
      assert.ok(!processCommand.includes(templatePath));
      assert.ok(!processCommand.includes(outputPath));

      const environment = invocation.options.env;
      assert.ok(environment);
      assert.strictEqual(environment[PSDOCS_TEMPLATE_PATH_ENV], templatePath);
      assert.strictEqual(environment[PSDOCS_OUTPUT_PATH_ENV], outputPath);
    }
  });
});
