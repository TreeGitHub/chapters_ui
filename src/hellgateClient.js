import { Hellgate } from "@starfish-codes/hellgate";

let client;

export async function initHellgate() {
  if (!client) {
    client = await Hellgate.init(
      "hg_sndbx_Ka/BKqvm7mMIN7u7eKdS8i31yjXcOhDCrPqRsX8rNGpAPa7rKbf9jDukvUomEACRzQ+0lB0DhbadKcS+B1831Q",
      {
        base_url: "https://sandbox.hellgate.io",
      }
    );
  }
  return client;
}
