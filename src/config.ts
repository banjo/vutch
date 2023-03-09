import { version } from "../package.json";

export const cliConfig = {
    name: "vutch",
    version,
    help: {
        description: `Watch and execute commands on file changes. 
Provide the command as flags or use interactive prompt to select files and command.`,
        usage: "vutch [options]",
        examples: ["vutch", "vutch --command=npm_run_build --files=src/index.ts,src/utils.ts"],
    },
    flags: {
        deep: {
            type: Number,
            description: "How deep to search for files",
            default: 2,
        },
        command: {
            type: String,
            description: "The command you want to execute, separated by underscores",
        },
        files: {
            type: String,
            description: "The files you want to watch, separated by commas in one string",
        },
        skipCopy: {
            type: Boolean,
            description: "Skip copying the command to the clipboard",
        },
        throws: {
            type: Boolean,
            description: "Throw errors instead of logging them",
            default: false,
        },
    },
};

export const ALWAYS_IGNORE = ["node_modules", "dist", "lib", "bin", "build"];
