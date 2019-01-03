function enKeyManager(res) {
    enKeyManager.supper.constructor.call(this,res);
    
};
js.extend(enKeyManager, keyManagerBase);



var res = [];
var enKeys = new enKeyManager(res);
res.push(new shiftKeyButton(0, { keyCode: 192, symbol: '`', shiftSymbol: '~' }));
res.push(new shiftKeyButton(1, { keyCode: 49, symbol: '1', shiftSymbol: '!' }));
res.push(new shiftKeyButton(2, { keyCode: 50, symbol: '2', shiftSymbol: '@' }));
res.push(new shiftKeyButton(3, { keyCode: 51, symbol: '3', shiftSymbol: '#' }));
res.push(new shiftKeyButton(4, { keyCode: 52, symbol: '4', shiftSymbol: '$' }));
res.push(new shiftKeyButton(5, { keyCode: 53, symbol: '5', shiftSymbol: '%' }));
res.push(new shiftKeyButton(6, { keyCode: 54, symbol: '6', shiftSymbol: '^' }));
res.push(new shiftKeyButton(7, { keyCode: 55, symbol: '7', shiftSymbol: '&' }));
res.push(new shiftKeyButton(8, { keyCode: 56, symbol: '8', shiftSymbol: '*' }));
res.push(new shiftKeyButton(9, { keyCode: 57, symbol: '9', shiftSymbol: '(' }));
res.push(new shiftKeyButton(10, { keyCode: 48, symbol: '0', shiftSymbol: ')' }));
res.push(new shiftKeyButton(11, { keyCode: 173, symbol: '-', shiftSymbol: '_' }));
res.push(new shiftKeyButton(12, { keyCode: 61, symbol: '=', shiftSymbol: '+' }));
res.push(new specialKey(13, { keyCode: 8, symbol: 'Back Space', width: "250%" }));

res.push(new specialKey(14, { keyCode: 9, symbol: 'Tab', width: "110%" }));
res.push(new simpleKey(15, { keyCode: 81, symbol: 'q' }));
res.push(new simpleKey(16, { keyCode: 87, symbol: 'w' }));
res.push(new simpleKey(17, { keyCode: 69, symbol: 'e' }));
res.push(new simpleKey(18, { keyCode: 82, symbol: 'r' }));
res.push(new simpleKey(19, { keyCode: 84, symbol: 't' }));
res.push(new simpleKey(20, { keyCode: 89, symbol: 'y' }));
res.push(new simpleKey(21, { keyCode: 85, symbol: 'u' }));
res.push(new simpleKey(22, { keyCode: 73, symbol: 'i' }));
res.push(new simpleKey(23, { keyCode: 79, symbol: 'o' }));
res.push(new simpleKey(24, { keyCode: 80, symbol: 'p' }));
res.push(new shiftKeyButton(25, { keyCode: 219, symbol: '[', shiftSymbol: '{' }));
res.push(new shiftKeyButton(26, { keyCode: 221, symbol: ']', shiftSymbol: '}' }));

res.push(new specialKey(27, { keyCode: 20, symbol: 'Caps Lock', width: "120%", capsLock : true }));
res.push(new simpleKey(28, { keyCode: 65, symbol: 'a' }));
res.push(new simpleKey(29, { keyCode: 83, symbol: 's' }));
res.push(new simpleKey(30, { keyCode: 68, symbol: 'd' }));
res.push(new simpleKey(31, { keyCode: 70, symbol: 'f' }));
res.push(new simpleKey(32, { keyCode: 71, symbol: 'g' }));
res.push(new simpleKey(33, { keyCode: 72, symbol: 'h' }));
res.push(new simpleKey(34, { keyCode: 74, symbol: 'j' }));
res.push(new simpleKey(35, { keyCode: 75, symbol: 'k' }));
res.push(new simpleKey(36, { keyCode: 76, symbol: 'l' }));
res.push(new shiftKeyButton(37, { keyCode: 59, symbol: ';', shiftSymbol: ':' }));
res.push(new shiftKeyButton(38, { keyCode: 222, symbol: "'", shiftSymbol: '"' }));
res.push(new enterKey(39, { keyCode: 13, symbol: 'Enter', width: "200%" }));

res.push(new specialKey(40, { keyCode: 16, symbol: 'Shift', width: "130%" }));
res.push(new simpleKey(41, { keyCode: 90, symbol: 'z' }));
res.push(new simpleKey(42, { keyCode: 88, symbol: 'x' }));
res.push(new simpleKey(43, { keyCode: 67, symbol: 'c' }));
res.push(new simpleKey(44, { keyCode: 86, symbol: 'v' }));
res.push(new simpleKey(45, { keyCode: 66, symbol: 'b' }));
res.push(new simpleKey(46, { keyCode: 78, symbol: 'n' }));
res.push(new simpleKey(47, { keyCode: 77, symbol: 'm' }));
res.push(new shiftKeyButton(48, { keyCode: 188, symbol: ',', shiftSymbol: '<' }));
res.push(new shiftKeyButton(49, { keyCode: 190, symbol: '.', shiftSymbol: '>' }));
res.push(new shiftKeyButton(50, { keyCode: 191, symbol: '\\', shiftSymbol: '?' }));
res.push(new specialKey(51, { keyCode: 16, symbol: 'Shift', width: "130%" }));

res.push(new specialKey(52, { keyCode: 0, symbol: 'Ctrl', width: "140%" }));
res.push(new specialKey(53, { keyCode: 0, symbol: 'S1'  }));
res.push(new specialKey(54, { keyCode: 0, symbol: 'Alt' }));
res.push(new specialKey(55, { keyCode: 32, symbol: 'Space', width: "800%" }));
res.push(new specialKey(56, { keyCode: 0, symbol: 'Alt' }));
res.push(new specialKey(57, { keyCode: 0, symbol: 'S2'  }));
res.push(new specialKey(58, { keyCode: 0, symbol: 'Ctrl', width: "140%" }));

var localizationEn = {
    Basic_Position: "BASIC POSITION.",
    LeftLittleFinger: "LEFT LITTLE FINGER.",
    LeftRingFinger: "LEFT RING FINGER.",
    LeftMiddleFinger: "LEFT MIDDLE FINGER.",
    LeftIndexFinger: "LEFT INDEX FINGER.",
    RightIndexFinger:"RIGHT INDEX FINGER.",
    RightMiddleFinger: "RIGHT MIDDLE FINGER.",
    RightRingFinger: "RIGHT RING FINGER.",
    RightLittleFinger: "RIGHT LITTLE FINGER.",
    RightShiftKeys: "RIGHT SHIFT KEYS.",
    LeftShiftKeys: "LEFT SHIFT KEYS.",
    LevelSuccess: "LEVEL SUCCESS",
    LevelFailed: "LEVEL FAILED",
    BasicKeys: "BASIC KEYS.",
    BasicKeysPart2: "BASIC KEYS.PART 2.",
    AdvancedKeys: "ADVANCED KEYS.",
    AdvancedKeysPart2:"ADVANCED KEYS.PART 2.",
    BasicKeysSummary: "BASIC KEYS SUMMARY.",
    BasicKeysSummaryPart2:"BASIC KEYS SUMMARY.PART 2.",
    NumericKeys: "NUMERIC KEYS.",
    NumericKeysPart2: "NUMERIC KEYS.PART 2.",
    ShiftKeys: "SHIFT KEYS.",
    ShiftKeysPart2: "SHIFT KEYS.PART 2.",
    SpecialKeysSummary: "SPECIAL KEYS SUMMARY.",
    SpecialKeysSummaryPart2:"SPECIAL KEYS SUMMARY.PART 2.",
    AllKeysSummary:"ALL KEYS SUMMARY.",
    Advanced:"ADVANCED.",
    DontTakeMistake:"DON'T TAKE MISTAKE.",
    Expert:"EXPERT.",
    EndGame:"END GAME.IT'S LAST SCREEN."
};