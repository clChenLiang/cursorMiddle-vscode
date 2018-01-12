const vscode = require('vscode');

function activate(context) {

    let watchChanged = vscode.workspace.createFileSystemWatcher("changed");

    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
         vscode.window.showInformationMessage('Hello World!');
    });

    let cc = vscode.commands.registerCommand('extension.saychelinag',function () {
        let editor = vscode.window.activeTextEditor;
        let range = editor.document.lineAt(100 - 1).range;
        editor.selection = new vscode.Selection(range.start, range.end);
        // editor.revealRange(range);
        let mid = editor.document.validateRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0)));

        vscode.window.showInformationMessage(JSON.stringify(editor));
        console.log(editor.document.fileName,editor.document.lineCount, editor.document.lineAt(0));
        try {
            console.log(editor.document.validateRange(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1000, 0))));
            vscode.window.showInformationMessage(mid.end.line);
            console.log(JSON.stringify(vscode.window.visibleTextEditors.viewColumn));
            vscode.window.activeTextEditor.revealRange(range, 1);
        }catch(e){
            console.log(e)     
        }
    });

    let lineCenter = vscode.commands.registerCommand('extension.lineCenter',function () {
        try{
            console.log('use lineToCenter');
            // vscode.commands.executeCommand("editor.action.insertLineAfter");
            // 当前光标所在位置
            let selectStart = vscode.window.activeTextEditor.selection.active;
            let replaceText = vscode.workspace.textDocuments[0].getText(new vscode.Range(selectStart,selectStart.translate(1,6)));
            console.log(`get the text : ${replaceText}`);
            vscode.window.activeTextEditor.edit(m => m.insert(selectStart, replaceText.replace(/\s/g,"") ? "\r\t":"\r"));
            currentLineToCenter();
        }catch(e){
            console.log('error',e);
        }
        
    })


    /**
     * 将当前行居中
     */
    let currentLineToCenter = function () {
        let curLine = vscode.window.activeTextEditor.selection.start.line;
        _lineToPlace(curLine,'center')
    }
    /**
     * 将指定行移至指定位置
     * @param {Line} line 要居中的行
     * @param {string} 放置的位置 -- 枚举：居中，顶部，头部
     */
    let _lineToPlace = function (line,place) {
        vscode.commands.executeCommand('revealLine',{
            lineNumber: line,
            at: place
        })
    }
    context.subscriptions.push(disposable);
    context.subscriptions.push(cc);
    context.subscriptions.push(lineCenter);
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
function isBlack(string) {
    for(let i in string) {
        switch (string[i]) {
            case "":
            case "\t":
            case " ":
            case "\b":
            case "\r":
                break;
            default:
                return false;
                break;
        }
    }
    return true;
}
exports.deactivate = deactivate;