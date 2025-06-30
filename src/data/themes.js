import { flavorData } from "./flavors.js";
import { mkConfig, generateCsv, asString } from "export-to-csv";
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";

const config = mkConfig({ useKeysAsHeaders: true});

const themeArray = flavorData.map(item => {
    return {"theme": item.theme}
});

const csv = generateCsv(config)(themeArray);
const filename = "themes.csv";
const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

writeFile(filename, csvBuffer, (err) => {
  if (err) throw err;
  console.log("file saved: ", filename);
});
