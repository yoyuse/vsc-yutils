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

Scroll so that current line is in middle (or top) of viewport

* `ctrl+l` (macOS) or `ctrl+alt+l` (Windows and Linux)

## Requirements

* VS Code 1.75.0 or later
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
