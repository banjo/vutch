import { Options } from "./types";
import { callout, normal } from "./utils";

export const runFlags = (properties: Options) => {
    const { files: flagFiles, command } = properties;

    const files = flagFiles?.split(",");

    if (!files || !command) {
        throw new Error("You must provide both the files and the command");
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
