const HEIGHT_DEFAULT = true;
const WIDTH_DEFAULT = false;


document.addEventListener('DOMContentLoaded', async () => {

    const heightOption = document.getElementById('height-option') as HTMLInputElement;
    const widthOption = document.getElementById('width-option') as HTMLInputElement;

    const localHeightValue = await getDataFromLocalStorage('height');
    if (typeof (localHeightValue) === "boolean") {
        heightOption.checked = localHeightValue;
    }
    else {
        heightOption.checked = HEIGHT_DEFAULT;
        addDataToLocalStorage('height', HEIGHT_DEFAULT);
    }

    const localWidthValue = await getDataFromLocalStorage('width');
    if (typeof (localWidthValue) === "boolean") {
        widthOption.checked = localWidthValue;
    } else {
        widthOption.checked = WIDTH_DEFAULT;
        addDataToLocalStorage('width', WIDTH_DEFAULT);
    }

})

document.getElementById('height-option').onclick = async (event) => {
    const target = event.target as HTMLInputElement;
    addDataToLocalStorage('height', target.checked);
}

document.getElementById('width-option').onclick = async (event) => {
    const target = event.target as HTMLInputElement;
    addDataToLocalStorage('width', target.checked);
}

async function getDataFromLocalStorage(key: string) {
    let data = localStorage.getItem(key);

    if (data) return await JSON.parse(data);
    else return null;
}


function addDataToLocalStorage(key: string, value: boolean) {
    localStorage.setItem(key, JSON.stringify(value));
}