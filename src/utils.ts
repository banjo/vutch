import chokidar from "chokidar";
import { execaCommand } from "execa";
import pc from "picocolors";

export const title = (content: string) => pc.green(content);
export const callout = (content: string) => pc.green(content);

export const buildCommandForExample = (command: string, files: string[]) => {
    const commandWithUnderscores = command.replaceAll(" ", "_");
    return `wetch --command=${commandWithUnderscores} --files=${files.join(",")}`;
};

export const watchFiles = (command: string, files: string[]) => {
    chokidar.watch(files).on("change", async path => {
        console.log(
            pc.yellow(`Change detected in ${callout(path)}, executing ${callout(command)}`)
        );
        await execaCommand(command, { stdio: "inherit" });

        console.log(pc.yellow("\nCommand executed successfully"));
    });
};
