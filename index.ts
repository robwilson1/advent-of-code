import { argv } from "process";

async function importAndRunDay(year: string, day: string) {
  try {
    // Construct the module path based on the year and day
    const modulePath = `./${year}/${day}/index.ts`;

    // Dynamically import the specified module
    const dayModule = await import(modulePath);
    if (dayModule && dayModule.default) {
      // Call the default function exported by the module
      await dayModule.default();
    } else {
      console.error("The specified module does not export a default function.");
    }
  } catch (error) {
    console.error("An error occurred while importing the module:", error);
  }
}

// Main function to run the CLI
async function main([_runtime, _loc, ...args]: string[]) {
  const yearFlag = "--year=";
  const dayFlag = "--day=";

  try {
    const year = args[0]?.split(yearFlag)[1] || "2022";
    const day = args[1]?.split(dayFlag)[1] || "1";

    await importAndRunDay(year, day);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

main(argv);
