
const vscode = require('vscode');
// 设置全局变量：是否打开居中功能
let isOpenCenterLine = false;

function activate(context) {
    // 全局开启功能
    let openCloseCenterLineExtension = vscode.commands.registerCommand('extension.openCenterLine', function () {
        this.isOpenCenterLine = !this.isOpenCenterLine;
        try{
            console.log(cursorMiddle.openKey);
            console.log(JSON.stringify(vscode.workspace.getConfiguration('cursorMiddle.openKey')))
            // console.log(vscode.workspace.cursorMiddle.open);
        }catch(e){
            console.log(e);
        }
        console.log('1--. 插件是否启用', this.isOpenCenterLine);
    })
    // 方向下 绑定功能 -- 未完成
    let downCenter = vscode.commands.registerCommand('extension.downLineCenter',function () {
        if(!this.isOpenCenterLine) {

            return ;
        }
        vscode.commands.executeCommand("workbench.action.interactivePlayground.arrowDown");
        let nextCursorPosition = vscode.window.activeTextEditor.selection.active.translate(3, 0);
        let newRange = new vscode.Range(nextCursorPosition, nextCursorPosition.translate(0, 1));

        // vscode.window.activeTextEditor.revealRange()
        currentLineToCenter();
    });

    let lineCenter = vscode.commands.registerCommand('extension.enterLineCenter', function () {
        if (!this.isOpenCenterLine) return;
        try{
            console.log('use lineToCenter');
            // 当前光标所在位置
            let selectStart = vscode.window.activeTextEditor.selection.active;
            // 以当前位置向下检查一行：为空则加回车
            console.log(`the selector is :${JSON.stringify(selectStart)}`);
            let nextLinePreText = vscode.workspace.textDocuments[0].getText(new vscode.Range(selectStart,selectStart.translate(1,6)));
            console.log(`the nextLineText :${nextLinePreText}`);
            // 鼠标所在当前行的文本
            let curLineText = vscode.workspace.textDocuments[0].lineAt(selectStart.line).text;
            console.log(`curLineText is :--${curLineText}--`);
            // 函数或者对象 { 后多加一个 tab
            // let nextEnterOREnterTabString = _getLastNotBlackString(curLineText) === '{' ? '\t' : '';
            let nextEnterOREnterTabString = _getLastNotBlackString(curLineText.substring(0,selectStart.character)) === '{' ? '\t' : '';
            // 对 {} 结尾的，应该再额外操作 --- 需要从 选中的位置 到 最后
            // 为 ; 
            let insertText = "\r" + _getPreBlackString(curLineText) + nextEnterOREnterTabString;

            console.log(`get the text : ${insertText}`);
            vscode.window.activeTextEditor.edit(m => m.insert(selectStart, insertText));
            // 前移一行
            /* vscode.commands.executeCommand('cursorMove', {
                to: 'up',
                by: 'wrappedLine',
                value: 1
            }); */
            console.log(`after insert the selector is ${JSON.stringify(vscode.window.activeTextEditor.selection.active)}`);
            currentLineToCenter();
            console.log(`after insert the selector is ${JSON.stringify(vscode.window.activeTextEditor.selection.active)}`);
        }catch(e){
            console.log('error',e);
        }
        
    })

    context.subscriptions.push(lineCenter);
    context.subscriptions.push(downCenter);
    context.subscriptions.push(openCloseCenterLineExtension);
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
        console.log(`_getPreBlackString :--${string},${(typeof string)}--`);
        if (typeof string !== "string") return "";
        // 获得首个非空字符前置位 index
        // /[{\w]/
        let index = string.search(/[^\s]/);
        console.log(`get the preBlack text :--${index}, ${string.substring(0, index + 1)}--`);
        return string.substring(0,index);
    }

    function _getLastNotBlackString(string) {
        if (typeof string !== "string") return "";
        // 最后一个非空字符
        let index = string.search(/.\s*$/);
        console.log(`get the param string : -${string}-`);
        console.log('get the lastNotBlack :',index, string.substring(index, index + 1));
        return string.substring(index,index+1);
    }

    function _addLineAfterCurrentByMoveCursor(n) {
        
    }

    /**
     * 将鼠标上下移动，以行为单位
     * @param {string} direction enum {up,down}
     * @param {number} lines 
     */
    function _moveCursorVertical(direction, lines) {
        vscode.commands.executeCommand('cursorMove', {
            to: direction,
            by: 'wrappedLine',
            value: lines
        });
    }
    /**
     * 将鼠标水平移动，即在当前行左右移动
     * @param {string:['left','right']} direction 
     * @param {number} chars 移动的字符串数
     */
    function _moveCursorHorizontal(direction, chars) {

    }
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