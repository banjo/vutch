import { intro, isCancel, multiselect, note, outro, text } from "@clack/prompts";
import clipboard from "clipboardy";
import { globby } from "globby";
import pc from "picocolors";
import { Options } from "./types";
import { buildCommandForExample, callout, title } from "./utils";

export const runPrompt = async ({ deep }: Options) => {
    const currentFiles = await globby(["."], {
        gitignore: true,
        deep: deep,
    });

    intro(pc.bgGreen(pc.black(" Execute commands on file changes ")));

    const files = (await multiselect({
        message: title("Select files to watch"),
        options: currentFiles.map(file => ({
            label: file,
            value: file,
        })),
    })) as string[];

    if (isCancel(files)) {
        outro("Wetch cancelled");
        process.exit(0);
    }

    const command = (await text({
        message: title("Enter the command you want to execute"),
        placeholder: "npm run build",
        defaultValue: "npm run build",
    })) as string;

    if (isCancel(command)) {
        outro("Wetch cancelled");
        process.exit(0);
    }

    const usageCommand = buildCommandForExample(command, files);
    clipboard.writeSync(usageCommand);
    const message = `You can activate the watcher without prompt with the following command:
${callout(usageCommand)}
It has been copied to the clipboard.`;

    note(message);

    outro("Wetch activated! Press Ctrl+C to stop watching");

    return {
        command,
        files,
    };
};