#!/usr/bin/env node

import { cli } from "cleye";
import { version } from "../package.json";
import { runFlags } from "./flags";
import { runPrompt } from "./prompt";
import { watchFiles } from "./utils";

const argv = cli({
    name: "wetch",
    version,
    help: {
        description: `Watch and execute commands on file changes. 
Either use the prompts or provide the arguments directly.`,
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
    },
});

type Arguments = typeof argv;

const main = async (arguments_: Arguments) => {
    const options = {
        deep: arguments_.flags.deep,
        command: arguments_.flags.command,
        files: arguments_.flags.files,
    };

    const hasProvidedAllFlags = options.files && options.command;

    const handler = hasProvidedAllFlags ? runFlags : runPrompt;
    const { command, files } = await handler(options);

    watchFiles(command, files);
};

main(argv);
