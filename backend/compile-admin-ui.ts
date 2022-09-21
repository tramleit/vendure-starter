import { compileUiExtensions } from "@vendure/ui-devkit/compiler";
import * as path from "path";

compileUiExtensions({
  outputPath: path.join(__dirname, "/admin-ui"),
  extensions: [
    {
      translations: {
        en: path.join(__dirname, "src", "translations/en.json"),
        vi: path.join(__dirname, "src", "translations/vi.json"),
      },
    },
  ],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
