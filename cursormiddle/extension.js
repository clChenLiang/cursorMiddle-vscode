// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cursormiddle" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });
    let cc = vscode.commands.registerCommand('extension.saychelinag',function () {
        vscode.window.showInformationMessage('Hello ccc!');
        vscode.window.showInformationMessage(JSON.stringify(vscode.window.activeTextEditor.selection));
        // vscode.window.showInformationMessage('workspaceedit.size',JSON.stringify(vscode.WorkspaceEdit.size));
        // vscode.commands.executeCommand("workbench.action.gotoLine", 55);
        // vscode.window.showInformationMessage(JSON.stringify(vscode..));
        let editor = vscode.window.activeTextEditor;
        let range = editor.document.lineAt(55 - 1).range;
        editor.selection = new vscode.Selection(range.start, range.end);
        editor.revealRange(range);
        let mid = editor.document.validateRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)));

        vscode.window.showInformationMessage(JSON.stringify(editor));
        console.log(editor.document.fileName,editor.document.lineCount, editor.document.lineAt(0));
        try {
            console.log(editor.document.validateRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0))));
            vscode.window.showInformationMessage(mid.end.line);
            console.log(JSON.stringify(vscode.window.visibleTextEditors));
        }catch(e){
            console.log(e)     
        }
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
        vscode.window.showInformationMessage();
    })
    context.subscriptions.push(disposable);
    context.subscriptions.push(cc);

    // let changPosition = vscode.commands.registerCommand('extension.setPosition',function name(params) {
    // let textEditor = vscode.window.activeTextEditor;
    // textEditor.selection
    // })
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    console.log('start a console.log !');
    // vscode.window.showInformationMessage('aslkfjaslkjf');
}
exports.deactivate = deactivate;