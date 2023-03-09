#!/usr/bin/env node

import { cli } from "cleye";
import { cliConfig } from "./config";
import { runFlags } from "./flags";
import { runPrompt } from "./prompt";
import { watchFiles } from "./utils";

cli(cliConfig, async arguments_ => {
    const options = {
        deep: arguments_.flags.deep,
        command: arguments_.flags.command,
        files: arguments_.flags.files,
        skipCopy: arguments_.flags.skipCopy,
        throws: arguments_.flags.throws,
    };

    const hasProvidedAllFlags = options.files && options.command;

    const handler = hasProvidedAllFlags ? runFlags : runPrompt;
    const { command, files } = await handler(options);

    watchFiles(command, files);
});
