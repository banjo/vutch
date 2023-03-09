import { intro, isCancel, multiselect, note, outro, text } from "@clack/prompts";
import clipboard from "clipboardy";
import { globby } from "globby";
import pc from "picocolors";
import { ALWAYS_IGNORE } from "./config";
import { Options } from "./types";
import { buildCommandForExample, callout, warning } from "./utils";

export const runPrompt = async ({ deep, skipCopy }: Options) => {
    const currentFiles = await globby(["."], {
        gitignore: true,
        deep: deep,
        ignore: ALWAYS_IGNORE,
    });

    intro(pc.bgGreen(pc.black(" Execute commands on file changes ")));

    const files = (await multiselect({
        message: callout("Select files to watch"),
        options: currentFiles.map(file => ({
            label: file,
            value: file,
        })),
    })) as string[];

    if (isCancel(files)) {
        outro(warning("vutch cancelled"));
        process.exit(0);
    }

    const command = (await text({
        message: callout("Enter the command you want to execute"),
        placeholder: "npm run build",
        defaultValue: "npm run build",
    })) as string;

    if (isCancel(command)) {
        outro(warning("vutch cancelled"));
        process.exit(0);
    }

    if (!skipCopy) {
        const usageCommand = buildCommandForExample(command, files);
        clipboard.writeSync(usageCommand);

        const message = `You can activate the watcher without prompt with the following command:
${callout(usageCommand)}
It has been copied to the clipboard.`;

        note(message);
    }

    outro("vutch activated! Press Ctrl+C to stop watching");

    return {
        command,
        files,
    };
};
