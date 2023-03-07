import { Options } from "./types";
import { normal } from "./utils";

export const runFlags = (properties: Options) => {
    const { files: flagFiles, command: flagCommand } = properties;

    const files = flagFiles?.split(",");
    const command = flagCommand?.replace("_", " ");

    if (!files || !command) {
        throw new Error("You must provide both the files and the command");
    }

    console.log(normal("\nvutch activated! Press Ctrl+C to stop watching"));

    return {
        command,
        files,
    };
};
