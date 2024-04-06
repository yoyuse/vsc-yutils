// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { openEmacs, openInOpen } from './open-emacs';
import { openSpace, prefixedPaste, recenter, recenterReset, saveModified, trailingPunctuation } from './yutils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	/* console.log('Congratulations, your extension "vsc-yutils" is now active!'); */

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	/*
	let disposable = vscode.commands.registerCommand('vsc-yutils.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vsc-yutils!');
	});
	 */
	let disposable: vscode.Disposable;
	//
	// Open Emacs
	disposable = vscode.commands.registerCommand('vsc-yutils.open-emacs', () => {
		openEmacs().catch(e => vscode.window.showErrorMessage(e));
	});
	context.subscriptions.push(disposable);
	//
	// Open In Open
	disposable = vscode.commands.registerCommand('vsc-yutils.open-in-open', () => {
		openInOpen().catch(e => vscode.window.showErrorMessage(e));
	});
	context.subscriptions.push(disposable);
	//
	// Open Space
	disposable = vscode.commands.registerTextEditorCommand('vsc-yutils.open-space', (textEditor: vscode.TextEditor, _: vscode.TextEditorEdit) => {
		return openSpace(textEditor);
	});
	context.subscriptions.push(disposable);
	//
	// Prefixed Paste
	disposable = vscode.commands.registerCommand('vsc-yutils.prefixed-paste', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		prefixedPaste(editor);
	});
	context.subscriptions.push(disposable);
	//
	// Recenter
	/*
	disposable = vscode.commands.registerCommand('vsc-yutils.recenter', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		recenter(editor);
	});
	/*/
	disposable = vscode.commands.registerTextEditorCommand('vsc-yutils.recenter', (textEditor: vscode.TextEditor, _: vscode.TextEditorEdit) => {
		return recenter(textEditor);
	});
	vscode.window.onDidChangeTextEditorSelection((_) => { recenterReset(); });
	vscode.window.onDidChangeTextEditorVisibleRanges((_) => { recenterReset(); });
	//*/
	context.subscriptions.push(disposable);
	//
	// Save Modified
	/*
	disposable = vscode.commands.registerCommand('vsc-yutils.save-modified', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		saveModified(editor);
	});
	/*/
	disposable = vscode.commands.registerTextEditorCommand('vsc-yutils.save-modified', (textEditor: vscode.TextEditor, _: vscode.TextEditorEdit) => {
		return saveModified(textEditor);
	});
	//*/
	context.subscriptions.push(disposable);
	//
	// Trailing Punctuation
	disposable = vscode.commands.registerTextEditorCommand('vsc-yutils.trailing-punctuation', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		return trailingPunctuation(textEditor, edit);
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
