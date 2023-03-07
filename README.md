# Wetch

Execute commands when files change. Either with a simple prompt in the CLI, or with two simple flags.

* Run `wetch` to choose files and commands in a beautiful CLI.
* Define files and command directly with the `--files` and `--command` flags.
* Command is copied to the clipboard when using the prompt, allowing you to use it quickly again.

## Install

```bash
npm install wetch -g
```

## Usage

```bash
# run prompt
wetch

# run with flags
wetch --files=index.js,config.js  --command="npm_run_build"

# prompt with deeper directory
wetch --deep=3
```

## Flags

* `--files` - Comma separated list of files to watch.
* `--command` - Command to execute when files change, use underscore instead of spaces.
* `--deep` - How deep to go in the directory tree when using the prompt.
