const getStyleIndex = () => {
  // return 'custom-style-01'
  return Math.floor(Math.random() * 1000000)
}

// handle the click event on the apply button
document.getElementById('apply-btn').onclick = async (event) => {
  event.preventDefault()
  processController()
}

const ALLOWED_ELEMENTS = ['Container', 'Section']

// controls the process for each element
const processController = async () => {
  const selectedElement = await webflow.getSelectedElement()
  const typeOfSelectedElement = selectedElement.type

  if (!selectedElement) return statusController('ERROR', 'No element selected')
  else if (typeOfSelectedElement !== 'Section' && typeOfSelectedElement !== 'Container') return statusController('ERROR', 'Element not supported')

  // if selected continue
  statusController('LOADING', 'Processing styles...')

  // disable apply button
  buttonContoller.disable()

  const webflowStyleClass = await stylesConverter()

  statusController('LOADING', 'Applying styles...')

  selectedElement.setStyles([webflowStyleClass])
  await selectedElement.save()

  statusController('SUCCESS', 'Styles applied successfully')
  // enable apply button
  buttonContoller.enable()

}

// main function
const stylesConverter = async () => {
  const inputStyles = document.getElementById('textarea') as HTMLTextAreaElement

  const styles = inputStyles.value
  const processedData = dataProcessor(styles)

  return await applyStyles(processedData)
}

// sub functions - (data)
const dataProcessor = (data: string) => {
  const lines = data.split(';');
  const styleObject: webflowStyleProperty[] = [];

  // Process each line
  lines.forEach(line => {
    // Split each line into property and value
    const [property, ...valueParts] = line.split(':').map(part => part.trim());

    // Check if both property and value are present
    if (property && valueParts.length > 0) {
      // Join the value parts to handle values with colons
      const value = valueParts.join(':').trim();

      try {
        // Add the property-value pair to the styleObject
        // @ts-ignore
        styleObject.push({ property, value });
      } catch {
        // console.log('error')
      }
    }
  });

  return styleObject
  // insert result in p tag with id result
  const result = document.getElementById('result')
  result.innerHTML = JSON.stringify(styleObject)
}

const applyStyles = async (data: webflowStyleProperty[]) => {

  const webflowStyleClass = webflow.createStyle(`random-${getStyleIndex()}`);

  data.forEach(async (style) => {
    webflowStyleClass.setProperty(style.property, style.value, { breakpoint: 'main', pseudo: 'noPseudo' })
  })

  // creating class in webflow
  await webflowStyleClass.save()
  // returning class
  return webflowStyleClass
}


// sub functions - (visual)
const statusController = (status: 'ERROR' | 'SUCCESS' | 'LOADING' | 'NO_SELECT', text: string) => {
  const statusElement = document.getElementById('status-text')
  statusElement.classList.value = ''

  if (status === 'ERROR') {
    statusElement.innerHTML = text
    statusElement.classList.add('text-[#CE2142]')
  } else if (status === 'SUCCESS') {
    statusElement.innerHTML = text
    statusElement.classList.add('text-[#12AD63]')
  } else if (status === 'LOADING') {
    statusElement.innerHTML = text
    statusElement.classList.add('text-[#FBBC04]')
  } else if (status === 'NO_SELECT') {
    statusElement.innerHTML = text
    statusElement.classList.add('text-[#BDBDBD]')
  }

  updateStatusIcon(getIcon(status))

  function updateStatusIcon(icon: string) {
    const statusIcon = document.getElementById('status-icon')
    statusIcon.innerHTML = ''

    // convert string to svg element and append
    const parser = new DOMParser();
    const iconElement = parser.parseFromString(icon, "image/svg+xml");

    statusIcon.appendChild(iconElement.documentElement)
  }

}

class buttonContoller {
  static disable() {
    const button = document.getElementById('apply-btn')
    button.classList.add('disabled')
    button.setAttribute('disabled', 'true')
  }
  static enable() {
    const button = document.getElementById('apply-btn')
    button.classList.remove('disabled')
    button.removeAttribute('disabled')
  }
}

const getIcon = (status: 'ERROR' | 'SUCCESS' | 'LOADING' | 'NO_SELECT') => {

  if (status === 'ERROR') {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <g clip-path="url(#clip0_466_795)">
        <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#CE2142" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 4V6" stroke="#CE2142" stroke-linecap="square" stroke-linejoin="round"/>
        <path d="M6 8H6.005" stroke="#CE2142" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_466_795">
          <rect width="14" height="14" fill="white"/>
        </clipPath>
      </defs>
    </svg>`
    )

  } else if (status === 'SUCCESS') {
    return (`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <g clip-path="url(#clip0_466_792)">
      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#12AD63" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.5 6L5.5 7L7.5 5" stroke="#12AD63" stroke-linecap="square" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_466_792">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
    `)

  } else if (status === 'LOADING') {
    return (`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" class="animate-spin" viewBox="0 0 12 12" fill="none">
  <path d="M10.5 5.99998C10.5 6.95027 10.1991 7.87616 9.64047 8.64494C9.08187 9.41372 8.29423 9.98593 7.39044 10.2796C6.48665 10.5732 5.5131 10.5732 4.60932 10.2795C3.70555 9.9858 2.91794 9.41355 2.35938 8.64473C1.80083 7.87592 1.49999 6.95002 1.5 5.99972C1.50001 5.04943 1.80085 4.12353 2.35942 3.35473C2.91799 2.58592 3.7056 2.01368 4.60938 1.72001C5.51316 1.42635 6.48671 1.42634 7.3905 1.71998" stroke="#FBBC04" stroke-linecap="square" stroke-linejoin="round"/>
</svg>
    `)

  } else if (status === 'NO_SELECT') {
    return (`
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M4.5 4.5L7 10.5L7.9 7.9L10.5 7L4.5 4.5Z" stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.59961 1.1001L3.99961 2.5501" stroke="#BDBDBD" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M2.54961 4.0001L1.09961 3.6001" stroke="#BDBDBD" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M7 2.05005L6 3.00005" stroke="#BDBDBD" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M2.9998 6L2.0498 7" stroke="#BDBDBD" stroke-linecap="square" stroke-linejoin="round"/>
  </svg>
    `)
  }

}

// document.getElementsByTagName('button')[0].onclick = async (event) => {
//   event.preventDefault()

//   const input = document.getElementsByTagName('input')[0]
//   const value = input.value



//   const selectedElement = await webflow.getSelectedElement()
//   if (selectedElement && selectedElement.textContent) {
//     let myStyle = webflow.createStyle(`myStyle${getStyleIndex()}`);

//     const lines = value.split(';');
//     const styleObject = Object.create(null);


//     // Process each line
//     lines.forEach(line => {
//       // Split each line into property and value
//       const [property, ...valueParts] = line.split(':').map(part => part.trim());

//       // Check if both property and value are present
//       if (property && valueParts.length > 0) {
//         // Join the value parts to handle values with colons
//         const value = valueParts.join(':').trim();

//         // Add the property-value pair to the styleObject
//         styleObject[`${property}`] = value.split(';')[0];
//       }
//     });

//     // insert result in p tag with id result
//     const result = document.getElementById('result')
//     result.innerHTML = JSON.stringify(styleObject)

//     myStyle.setProperties(styleObject, { breakpoint: 'main', pseudo: 'noPseudo' })
//     await myStyle.save()


//     selectedElement.setStyles([myStyle])
//     // selectedElement.setTextContent(value)
//     await selectedElement.save()

//   }

// }


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


