import chokidar from "chokidar";
import { execaCommand } from "execa";
import pc from "picocolors";

export const callout = (content: string) => pc.green(content);
export const normal = (content: string) => pc.yellow(content);
export const warning = (content: string) => pc.red(content);

export const buildCommandForExample = (command: string, files: string[]) => {
    const commandWithUnderscores = command.replaceAll(" ", "_");
    return `vutch --command=${commandWithUnderscores} --files=${files.join(",")}`;
};

export const watchFiles = (command: string, files: string[]) => {
    chokidar.watch(files).on("change", async path => {
        console.log(normal(`Change detected in ${callout(path)}, executing ${callout(command)}`));
        await execaCommand(command, { stdio: "inherit" });
        console.log(normal("\nCommand executed successfully"));
    });
};
