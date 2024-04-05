# vsc-yutils README

My utils for VS Code

## Features

vsc-yutils provides following commands:

### `Yutils: Open Emacs`

Open current file in Emacs

### `Yutils: Open In Open`

Open current file in open command of system

### `Yutils: Open Space`

Insert spaces around cursor (or selection)

* `cmd+shift+space` (macOS) or `shift+space` (Windows and Linux)

### `Yutils: Prefixed Paste`

Paste with prefix (which is string from line beginning upto cursor) at each line beginning

* `ctrl+shift+v`

### `Yutils: Recenter`

Scroll so that current line is in middle (or top, bottom) of viewport

* `ctrl+l` (macOS) or `ctrl+alt+l` (Windows and Linux)

### `Yutils: Save Modified`

Save file only if file is modified

* `ctrl+s` (macOS) or `ctrl+alt+s` (Windows and Linux)

### `Yutils: Trailing Punctuation`

Toggle trailing semicolon (or comma for JSON).

(Based on [enyancc/vscode-ext-trailing-semicolon: Trailing Semicolon extension for VSCode](https://github.com/enyancc/vscode-ext-trailing-semicolon))

* `cmd+;` (macOS) or `ctrl+alt+;` (Windows and Linux)

## Requirements

* VS Code 1.87.0 or later
* `/usr/bin/which`
* `emacsclient`
* `open` or `xdg-open`

## Extension Settings

N/A

## Known Issues

* `Yutils: Open Emacs`
  * Column position may be not accurate
* `Yutils: Open In Open`
  * Supports macOS and Linux, not Windows

## Release Notes

See CHANGELOG.md
