const vscode = require('vscode');

function activate(context) {
    let lineCenter = vscode.commands.registerCommand('extension.lineCenter',function () {
        try{
            console.log('use lineToCenter');
            // vscode.commands.executeCommand("editor.action.insertLineAfter");
            // 当前光标所在位置
            let selectStart = vscode.window.activeTextEditor.selection.active;
            // 以当前位置向下检查一行：为空则加回车
            let nextLinePreText = vscode.workspace.textDocuments[0].getText(new vscode.Range(selectStart,selectStart.translate(1,6)));
            // console.log(`the current lineText : ${}`);
            // let preRange = new vscode.Range()
            // 鼠标所在当前行的文本
            let curLineText = vscode.workspace.textDocuments[0].lineAt(selectStart.line).text;
            // preText = preText.substr(0,preText.indexOf(  ));
            // let nextLinePrecedingText = replaceText.replace(/\s/g, "") ? "\r\t" : "\r";
            console.log(`preText is :${curLineText}`);
            // let curLine = vscode.window.activeTextEditor.selection.start.line;
            // let nextEnterOREnterTabString = nextLinePreText.replace(/\s/g, "") ? "\t" : "";
            // 函数或者对象 { 后多加一个 tab
            let nextEnterOREnterTabString = _getLastNotBlackString(curLineText) === '{' ? '\t' : '';
            
            let insertText = "\r" + _getPreBlackString(curLineText) + nextEnterOREnterTabString;

            console.log(`get the text : ${_getLastNotBlackString(curLineText)}`);
            vscode.window.activeTextEditor.edit(m => m.insert(selectStart, insertText));
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
        console.log('curline is :',curLine);
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
    function _getPreBlackString(string) {
        if (typeof string !== "string") return "";
        // 获得首个非空字符前置位 index
        let index = string.search(/\s\w/);
        console.log(index);
        return string.substring(0,index+1);
    }
    function _getLastNotBlackString(string) {
        if (typeof string !== "string") return "";
        // 最后一个非空字符
        let index = string.search(/.\s*$/);
        console.log(`get the param string : -${string}-`);
        console.log('get the lastNotBlack :',index, string.substring(index, index + 1));
        return string.substring(index,index+1);
    }
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