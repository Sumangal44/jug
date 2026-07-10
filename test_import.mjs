const code = `import fs from "fs"; console.log(Object.keys(fs).slice(0,5));`;
import("data:text/javascript," + encodeURIComponent(code)).then(() => console.log("Done")).catch(console.error);
