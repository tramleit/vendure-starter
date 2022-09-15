import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import { bootstrap, DefaultJobQueuePlugin } from "@vendure/core";
import { populate } from "@vendure/core/cli";
import { initialData } from "./initial-data";
import { config } from "./vendure-config";

// const productsCsvFile = path.join(__dirname, "path/to/products.csv");

const populateConfig = {
  ...config,
  plugins: (config.plugins || []).filter(
    // Remove your JobQueuePlugin during populating to avoid
    // generating lots of unnecessary jobs as the Collections get created.
    (plugin) => plugin !== DefaultJobQueuePlugin && plugin !== AdminUiPlugin
  ),
};

populate(
  () => bootstrap(populateConfig),
  initialData
  //   productsCsvFile,
  //   "my-channel-token" // optional - used to assign imported
) // entities to the specified Channel
  .then((app) => {
    return app.close();
  })
  .then(
    () => process.exit(0),
    (err) => {
      console.log(err);
      process.exit(1);
    }
  );
