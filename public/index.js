var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getStyleIndex = () => {
    return Math.floor(Math.random() * 1000000);
};
document.getElementsByTagName('button')[0].onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    const input = document.getElementsByTagName('input')[0];
    const value = input.value;
    const selectedElement = yield webflow.getSelectedElement();
    if (selectedElement && selectedElement.textContent) {
        let myStyle = webflow.createStyle(`myStyle${getStyleIndex()}`);
        const lines = value.split(';');
        const styleObject = Object.create(null);
        // Process each line
        lines.forEach(line => {
            // Split each line into property and value
            const [property, ...valueParts] = line.split(':').map(part => part.trim());
            // Check if both property and value are present
            if (property && valueParts.length > 0) {
                // Join the value parts to handle values with colons
                const value = valueParts.join(':').trim();
                // Add the property-value pair to the styleObject
                styleObject[`${property}`] = value.split(';')[0];
            }
        });
        // insert result in p tag with id result
        const result = document.getElementById('result');
        result.innerHTML = JSON.stringify(styleObject);
        myStyle.setProperties(styleObject, { breakpoint: 'main', pseudo: 'noPseudo' });
        yield myStyle.save();
        selectedElement.setStyles([myStyle]);
        // selectedElement.setTextContent(value)
        yield selectedElement.save();
    }
});
// color: #7C8994; font-size: 14px;
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// document.getElementsByTagName('a')[0].onclick = async (event) => {
//   event.preventDefault()
//   const input = document.getElementsByTagName('input')[0]
//   const value = input.value
//   const selectedElement = await webflow.getSelectedElement()
//   if (selectedElement && selectedElement.textContent) {
//     let myStyle7 = webflow.createStyle(`myStyle${styleIndex++}1`);
//     myStyle7.setProperties({ "font-size": '88px', 'color': 'red' }, { breakpoint: 'main', pseudo: 'noPseudo' })
//     // myStyle7.setProperty('font-size', '76px', { breakpoint: 'main', pseudo: 'noPseudo' })
//     await myStyle7.save()
//     selectedElement.setStyles([myStyle7])
//     selectedElement.setTextContent(value)
//     await selectedElement.save()
//     // myStyle7.destroy()
//   }
// }
