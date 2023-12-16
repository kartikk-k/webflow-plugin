var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HEIGHT_DEFAULT = true;
const WIDTH_DEFAULT = false;
document.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    const heightOption = document.getElementById('height-option');
    const widthOption = document.getElementById('width-option');
    const localHeightValue = yield getDataFromLocalStorage('height');
    if (typeof (localHeightValue) === "boolean") {
        heightOption.checked = localHeightValue;
    }
    else {
        heightOption.checked = HEIGHT_DEFAULT;
        addDataToLocalStorage('height', HEIGHT_DEFAULT);
    }
    const localWidthValue = yield getDataFromLocalStorage('width');
    if (typeof (localWidthValue) === "boolean") {
        widthOption.checked = localWidthValue;
    }
    else {
        widthOption.checked = WIDTH_DEFAULT;
        addDataToLocalStorage('width', WIDTH_DEFAULT);
    }
}));
document.getElementById('height-option').onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    const target = event.target;
    addDataToLocalStorage('height', target.checked);
});
document.getElementById('width-option').onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    const target = event.target;
    addDataToLocalStorage('width', target.checked);
});
function getDataFromLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = localStorage.getItem(key);
        if (data)
            return yield JSON.parse(data);
        else
            return null;
    });
}
function addDataToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
