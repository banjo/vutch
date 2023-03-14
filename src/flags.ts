import { globby } from "globby";
import { ALWAYS_IGNORE } from "./config";
import { Options } from "./types";
import { callout, normal, warning } from "./utils";

export const runFlags = async (properties: Options) => {
    const { files: flagFiles, command, deep } = properties;

    const files = flagFiles?.split(",");

    if (!files || !command) {
        throw new Error("You must provide both the files and the command");
    }

    const fileExists = await globby(files, {
        gitignore: true,
        deep: deep,
        ignore: ALWAYS_IGNORE,
    });

    if (fileExists.length === 0) {
        console.log(warning("No files found matching the files flag, exiting..."));
        process.exit(0);
    }

    console.log(normal("\nVutch activated! Press Ctrl+C to stop watching"));
    console.log(
        normal(
            `Will execute command: ${callout(
                command
            )} when any of the following files change: ${callout(files.join(", "))}`
        )
    );

    return {
        command,
        files,
    };
};
