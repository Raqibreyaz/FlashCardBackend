import { config } from "dotenv";

config({ path: "./.env" });

import app from "./app.ts";

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`server is running`);
});
