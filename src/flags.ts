import { Options } from "./types";

export const runFlags = (properties: Options) => {
    const { files: flagFiles, command: flagCommand } = properties;

    const files = flagFiles?.split(",");
    const command = flagCommand?.replace("_", " ");

    if (!files || !command) {
        throw new Error("You must provide both the files and the command");
    }

    return {
        command,
        files,
    };
};
