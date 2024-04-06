import * as vscode from 'vscode';

// カーソルの両側にスペースを挿入
export const openSpace = async (editor: vscode.TextEditor) => {
    const selections = editor.selections;
    await editor.edit((editorEdit) => {
        editor.selections.map(async (selection) => {
            editorEdit.insert(selection.anchor, ' ');
            editorEdit.insert(selection.active, ' ');
        });
    });
    editor.selections = selections.map(selection => {
        return new vscode.Selection(selection.anchor.translate(0, 1), selection.active.translate(0, 1));
    });
};

export const prefixedPaste = async (editor: vscode.TextEditor) => {
    // クリップボードからテキストを取得
    let text = await vscode.env.clipboard.readText();
    // prefix を取得
    const selection = editor.selection;
    const row = selection.active.line;
    const bol = new vscode.Position(row, 0);
    let range = new vscode.Range(bol, selection.start);
    const prefix = editor.document.getText(range);
    // 行末判定
    const line = editor.document.lineAt(row);
    const eol = line.range.end;
    if (selection.end.character !== eol.character) {
        // 行末でない
        vscode.window.showWarningMessage('Cursor is not at end of line; pasting with prefix anyway');
    }
    // テキストを加工して prefix を付加
    text = text.replace(/\n(?!$)/g, "\n" + prefix);
    // editor でテキストを挿入
    range = new vscode.Range(selection.start, selection.end);
    editor.edit((editorEdit) => {
        editorEdit.replace(range, '');
        editorEdit.insert(range.start, text);
    });
};

/*
let recenterAt = 'center';
let timeoutId: NodeJS.Timeout | undefined = undefined;
export const recenter = (editor: vscode.TextEditor) => {
    clearTimeout(timeoutId);
    const line = editor.selection.active.line;
    vscode.commands.executeCommand('revealLine', {lineNumber: line, at: recenterAt});
    if (recenterAt === 'center') { recenterAt = 'top'; }
    else if (recenterAt === 'top') { recenterAt = 'bottom'; }
    else { recenterAt = 'center'; }
    timeoutId = setTimeout(() => { recenterAt = 'center'; }, 2000);
};
/*/
let recenterAt = 'center';
export let recenterAtCenter = true;
export const recenterReset = () => { recenterAtCenter = true; };
export const recenter = async (editor: vscode.TextEditor) => {
    if (recenterAtCenter) {
        recenterAt = 'center';
    } else {
        if (recenterAt === 'center') { recenterAt = 'top'; }
        else if (recenterAt === 'top') { recenterAt = 'bottom'; }
        else { recenterAt = 'center'; }
    }
    const line = editor.selection.active.line;
    await vscode.commands.executeCommand('revealLine', {lineNumber: line, at: recenterAt});
    recenterAtCenter = false;
};
//*/

// ファイルが変更されているときだけ保存する (Emacs の C-x C-s や Vim の :update 相当)
export const saveModified = (textEditor: vscode.TextEditor) => {
    const textDocument = textEditor.document;
    const message = (str: string) => { vscode.window.setStatusBarMessage(str, 10000); };
    if (textDocument.isDirty) {
        textDocument.save().then((success: boolean) => {
            if (success) {
                message(`Wrote ${textDocument.fileName}`);
            } else {
                message("Save Modified failed");
            }
        });
    } else {
        message("(No changes need to be saved)");
    }
};

// 行末の semicolon (json の場合は comma) をトグル
// based on https://github.com/enyancc/vscode-ext-trailing-semicolon
export const trailingPunctuation = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
    const cursorPosition = textEditor.selection.active;
    const line = textEditor.document.lineAt(cursorPosition);
    const languageId = textEditor.document.languageId;
    const punctuation = /^json/.test(languageId) ? ',' : ';';
    if (line.text[line.text.length - 1] === punctuation) {
        edit.delete(new vscode.Range(line.range.end.translate(0, -1), line.range.end));
    } else {
        edit.insert(line.range.end, punctuation);
    }
};
