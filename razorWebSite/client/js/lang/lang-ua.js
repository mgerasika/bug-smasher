function uaKeyManager(res) {
    uaKeyManager.supper.constructor.call(this, res);
};
js.extend(uaKeyManager, keyManagerBase);

var res = [];
var uaKeys = new uaKeyManager(res);
res.push(new shiftKeyButton(0, { keyCode: 192, symbol: '`', shiftSymbol: '~' }));
res.push(new shiftKeyButton(1, { keyCode: 49, symbol: '1', shiftSymbol: '!' }));
res.push(new shiftKeyButton(2, { keyCode: 50, symbol: '2', shiftSymbol: '"' }));
res.push(new shiftKeyButton(3, { keyCode: 51, symbol: '3', shiftSymbol: '№' }));
res.push(new shiftKeyButton(4, { keyCode: 52, symbol: '4', shiftSymbol: ';' }));
res.push(new shiftKeyButton(5, { keyCode: 53, symbol: '5', shiftSymbol: '%' }));
res.push(new shiftKeyButton(6, { keyCode: 54, symbol: '6', shiftSymbol: ':' }));
res.push(new shiftKeyButton(7, { keyCode: 55, symbol: '7', shiftSymbol: '?' }));
res.push(new shiftKeyButton(8, { keyCode: 56, symbol: '8', shiftSymbol: '*' }));
res.push(new shiftKeyButton(9, { keyCode: 57, symbol: '9', shiftSymbol: '(' }));
res.push(new shiftKeyButton(10, { keyCode: 48, symbol: '0', shiftSymbol: ')' }));
res.push(new shiftKeyButton(11, { keyCode: 173, symbol: '-', shiftSymbol: '_' }));
res.push(new shiftKeyButton(12, { keyCode: 61, symbol: '=', shiftSymbol: '+' }));
res.push(new specialKey(13, { keyCode: 8, symbol: 'Back Space', width: "5.4em" }));

res.push(new specialKey(14, { keyCode: 9, symbol: 'Tab', width: "3.5em" }));
res.push(new simpleKey(15, { keyCode: 81, symbol: 'й' }));
res.push(new simpleKey(16, { keyCode: 87, symbol: 'ц' }));
res.push(new simpleKey(17, { keyCode: 69, symbol: 'у' }));
res.push(new simpleKey(18, { keyCode: 82, symbol: 'к' }));
res.push(new simpleKey(19, { keyCode: 84, symbol: 'е' }));
res.push(new simpleKey(20, { keyCode: 89, symbol: 'н' }));
res.push(new simpleKey(21, { keyCode: 85, symbol: 'г' }));
res.push(new simpleKey(22, { keyCode: 73, symbol: 'ш' }));
res.push(new simpleKey(23, { keyCode: 79, symbol: 'щ' }));
res.push(new simpleKey(24, { keyCode: 80, symbol: 'з' }));
res.push(new simpleKey(25, { keyCode: 219, symbol: 'х' }));
res.push(new simpleKey(26, { keyCode: 221, symbol: 'ї' }));

res.push(new specialKey(27, { keyCode: 20, symbol: 'Caps Lock', width: "4.6em", capsLock : true }));
res.push(new simpleKey(28, { keyCode: 65, symbol: 'ф' }));
res.push(new simpleKey(29, { keyCode: 83, symbol: 'і' }));
res.push(new simpleKey(30, { keyCode: 68, symbol: 'в' }));
res.push(new simpleKey(31, { keyCode: 70, symbol: 'а' }));
res.push(new simpleKey(32, { keyCode: 71, symbol: 'п' }));
res.push(new simpleKey(33, { keyCode: 72, symbol: 'р' }));
res.push(new simpleKey(34, { keyCode: 74, symbol: 'о' }));
res.push(new simpleKey(35, { keyCode: 75, symbol: 'л' }));
res.push(new simpleKey(36, { keyCode: 76, symbol: 'д' }));
res.push(new simpleKey(37, { keyCode: 59, symbol: 'ж' }));
res.push(new simpleKey(38, { keyCode: 222, symbol: "є" }));
res.push(new enterKey(39, { keyCode: 13, symbol: 'Enter', width: "6em" }));

res.push(new specialKey(40, { keyCode: 16, symbol: 'Shift', width: "5.7em" }));
res.push(new simpleKey(41, { keyCode: 90, symbol: 'я' }));
res.push(new simpleKey(42, { keyCode: 88, symbol: 'ч' }));
res.push(new simpleKey(43, { keyCode: 67, symbol: 'с' }));
res.push(new simpleKey(44, { keyCode: 86, symbol: 'м' }));
res.push(new simpleKey(45, { keyCode: 66, symbol: 'и' }));
res.push(new simpleKey(46, { keyCode: 78, symbol: 'т' }));
res.push(new simpleKey(47, { keyCode: 77, symbol: 'ь' }));
res.push(new specialKey(48, { keyCode: 188, symbol: 'б' }));
res.push(new specialKey(49, { keyCode: 190, symbol: 'ю'}));
res.push(new shiftKeyButton(50, { keyCode: 191, symbol: '.', shiftSymbol: '/' }));
res.push(new specialKey(51, { keyCode: 16, symbol: 'Shift', width: "7.75em" }));

res.push(new specialKey(52, { keyCode: 0, symbol: 'Ctrl', width: "4em" }));
res.push(new specialKey(53, { keyCode: 0, symbol: 'S1'  }));
res.push(new specialKey(54, { keyCode: 0, symbol: 'Alt' }));
res.push(new specialKey(55, { keyCode: 32, symbol: 'Space', width: "21.95em" }));
res.push(new specialKey(56, { keyCode: 0, symbol: 'Alt'}));
res.push(new specialKey(57, { keyCode: 0, symbol: 'S2'  }));
res.push(new specialKey(58, { keyCode: 0, symbol: 'Ctrl', width: "4em" }));

var localizationUa = {
    Basic_Position: "БАЗОВА ПОЗИЦІЯ.",
    LeftLittleFinger: "ЛІВИЙ МІЗИНЕЦЬ.",
    LeftRingFinger: "ЛІВИЙ БЕЗІМЕННИЙ ПАЛЕЦЬ.",
    LeftMiddleFinger: "ЛІВИЙ СЕРЕДНІЙ ПАЛЕЦЬ.",
    LeftIndexFinger: "ЛІВИЙ ВКАЗІВНИЙ ПАЛЕЦЬ.",
    RightIndexFinger:"ПРАВИЙ ВКАЗІВНИЙ ПАЛЕЦЬ.",
    RightMiddleFinger: "ПРАВИЙ ВЕЛИКИЙ ПАЛЕЦЬ.",
    RightRingFinger: "ПРАВИЙ БЕЗІМЕННИЙ ПАЛЕЦЬ.",
    RightLittleFinger: "ПРАВИЙ МІЗИНЕЦЬ.",
    RightShiftKeys: "ПРАВІ SHIFT КНОПКИ.",
    LeftShiftKeys: "ЛІВІ SHIFT КНОПКИ.",
    LevelSuccess: "РІВЕНЬ ПРОЙДЕНО УСПІШНО",
    LevelFailed: "РІВЕНЬ НЕ ПРОЙДЕНО",
    BasicKeys: "БАЗОВІ КНОПКИ.",
    BasicKeysPart2: "БАЗОВІ КНОПКИ.ЧАСТИНА 2.",
    AdvancedKeys: "ІНШІ БАЗОВІ КНОПКИ.",
    AdvancedKeysPart2:"ІНШІ БАЗОВІ КНОПКИ.ЧАСТИНА 2.",
    BasicKeysSummary: "ПІДСУМОК БАЗОВИХ КНОПОК.",
    BasicKeysSummaryPart2:"ПІДСУМОК БАЗОВИХ КНОПОК.ЧАСТИНА 2.",
    NumericKeys: "ЧИСЛОВІ КНОПКИ.",
    NumericKeysPart2: "ЧИСЛОВІ КНОПКИ.ЧАСТИНА 2.",
    ShiftKeys: "SHIFT КНОПКИ.",
    ShiftKeysPart2: "SHIFT КНОПКИ.ЧАСТИНА 2.",
    SpecialKeysSummary: "ПІДСУМОК РОЗШИРЕНИХ КНОПКИ.",
    SpecialKeysSummaryPart2:"ПІДСУМОК РОЗШИРЕНИХ КНОПОК.ЧАСТИНА 2.",
    AllKeysSummary:"ПІДСУМОК УСІХ КНОПОК.",
    Advanced:"РОЗШИРЕНИЙ РІВЕНЬ.",
    DontTakeMistake:"НЕ РОБІТЬ ПОМИЛОК.",
    Expert:"ЕКСПЕРТ РІВЕНЬ.",
    EndGame:"КІНЕЦЬ ГРИ."
};