import * as vscode from 'vscode';

export const openSpace = async (editor: vscode.TextEditor) => {
    await editor.edit((editorEdit) => {
        editor.selections.map(selection => {
            const range = new vscode.Range(selection.start, selection.end);
            editorEdit.replace(range, '');
            editorEdit.insert(range.end.translate(0, 0), ' ');
        });
    });
    await vscode.commands.executeCommand('cursorMove', { to: 'left', by: 'character' });
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

export const recenter = (editor: vscode.TextEditor) => {
    const position = editor.selection.active;
    editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
};
