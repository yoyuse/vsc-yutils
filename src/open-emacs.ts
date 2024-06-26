import * as vscode from 'vscode';
import { execFile } from "child_process";
import { promisify } from "util";

export const openEmacs = async (): Promise<void> => {
    const execFilePromise = promisify(execFile);
    const editor = vscode.window.activeTextEditor;
    const fileName = editor?.document.fileName;
    if (!fileName) { vscode.window.showErrorMessage("No file name"); return; }
    const position = editor.selection.active;
    const line = position.line + 1;
    const column = position.character + 1; // XXX: 行に Tab や全角文字が含まれていると桁位置がずれる
    const emacsclient = (await execFilePromise("/usr/bin/which", ["emacsclient"])).stdout.replace(/\n$/, "");
    await execFilePromise(emacsclient, ["-a", "''", "-n", `+${line}:${column}`, fileName]);
};

export const openInOpen = async (): Promise<void> => {
    const isLinux = process.platform === 'linux';
    const isMac = process.platform === 'darwin';
    // const isWindows = process.platform === 'win32';
    //
    const execFilePromise = promisify(execFile);
    const editor = vscode.window.activeTextEditor;
    const fileName = editor?.document.fileName;
    if (!fileName) { vscode.window.showErrorMessage("No file name"); return; }
    const open = isLinux ? "xdg-open" : isMac ? "open" : null;
    if (!open) { vscode.window.showErrorMessage("Unknown platform"); return; }
    await execFilePromise(open, [fileName]);
};
