const vscode = require('vscode');

function activate(context) {

    let watchChanged = vscode.workspace.createFileSystemWatcher("changed");

    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
         vscode.window.showInformationMessage('Hello World!');
    });

    let cc = vscode.commands.registerCommand('extension.saychelinag',function () {
        vscode.window.showInformationMessage('Hello ccc!');
        vscode.window.showInformationMessage(JSON.stringify(vscode.window.activeTextEditor.selection));
        // vscode.window.showInformationMessage('workspaceedit.size',JSON.stringify(vscode.WorkspaceEdit.size));
        // vscode.commands.executeCommand("workbench.action.gotoLine", 55);
        // vscode.window.showInformationMessage(JSON.stringify(vscode..));
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
            let selectStart = vscode.window.activeTextEditor.selection.active;
            console.log(selectStart);
            vscode.commands.executeCommand("workbench.action.interactivePlayground.arrowDown");
            // visibleTextEditors 中处于活动的
            console.log(vscode.window.activeTextEditor); 
            // console.log(vscode.window.visibleTextEditors);
            // 没报错，但是没效果
            // vscode.TextEdit.insert(selectStart,"aaaaa\n");
            // vscode.TextEdit.replace(new vscode.Range(selectStart, selectStart.translate({ characterDelta: 0, lineDelta: 1 })), "aaaaa\n");
            let _positon_1 = new vscode.Position(180,0);
            let _positon_2 = new vscode.Position(180,20);
            let _range = new vscode.Range(_positon_1, _positon_2);
            console.log(_range,selectStart);
            let curRange = new vscode.Range(selectStart, selectStart/* .translate({ characterDelta: 0, lineDelta: 0 }) */);
            console.log('translate:');
            // console.log(vscode.window.activeTextEditor.edit(m => m.replace(curRange, "\n")));
            // 实现功能，但下行为空的时候不能自动回到行首！！！
            console.log(vscode.window.activeTextEditor.edit(m => m.insert(selectStart, "\r\t")));
            // vscode.commands.executeCommand("editor.action.insertLineBefore");
            console.log('adfa');
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
exports.deactivate = deactivate;