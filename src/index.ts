const getStyleIndex = () => {
  // return 'custom-style-02'
  return Math.floor(Math.random() * 1000000)
}


// handle the click event on the apply button
document.getElementById('apply-btn').onclick = async (event) => {

  event.preventDefault()
  await processController()

}

document.getElementById('class-clear').onclick = async (event) => {
  event.preventDefault()
  const classInput = document.getElementById('class-input') as HTMLInputElement
  classInput.value = ''
}

// controls the process for each element
const processController = async () => {
  const selectedElement = await webflow.getSelectedElement()
  // const typeOfSelectedElement = selectedElement.type

  if (!selectedElement) return statusController('ERROR', 'No element selected')

  // if selected continue
  statusController('LOADING', 'Processing styles...')

  // disable apply button
  buttonContoller.disable()

  const webflowStyleClass = await stylesConverter()

  statusController('LOADING', 'Applying styles...')

  if (selectedElement.styles) {
    selectedElement.setStyles([webflowStyleClass])
    await selectedElement.save()
  }

  webflowStyleClass.destroy()

  statusController('SUCCESS', 'Styles applied successfully')
  buttonContoller.enable()
}

// main function
const stylesConverter = async () => {
  const inputStyles = document.getElementById('textarea') as HTMLTextAreaElement

  const styles = inputStyles.value
  const styleObject2: Style = webflow.createStyle(`random-${getStyleIndex()}`)
  await dataProcessor(styles, styleObject2)

  return styleObject2
}

// sub functions - (data)
const dataProcessor = async (data: string, styleClass: Style) => {
  const lines = data.split(';');
  const styleObject: webflowStyleProperty[] = [];


  let heightAllowed: boolean;
  let widthAllowed: boolean;

  //  get settings from local storage
  const localHeightValue = await getDataFromLocalStorage_I('height');
  if (typeof (localHeightValue) === "boolean") heightAllowed = localHeightValue;

  const localWidthValue = await getDataFromLocalStorage_I('width');
  if (typeof (localWidthValue) === "boolean") widthAllowed = localWidthValue;


  // Process each line
  lines.forEach(line => {
    // Split each line into property and value
    const [property, ...valueParts] = line.split(':').map(part => part.trim());

    // Check if both property and value are present
    if (property && valueParts.length > 0) {

      styleClass.setProperty(property as StyleProperty, valueParts.join(':'), { breakpoint: 'main', pseudo: 'noPseudo' })

    }

  });

}

const applyStyles = async (data: webflowStyleProperty[]) => {

  const inputClass = document.getElementById('class-input') as HTMLInputElement
  const newClassName = inputClass.value.trim() || `random-${getStyleIndex()}`

  const webflowStyleClass = webflow.createStyle(newClassName);

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


async function getDataFromLocalStorage_I(key: string) {
  let data = localStorage.getItem(key);

  if (data) return await JSON.parse(data);
  else return null;
}







function timeout<T>(milliseconds: number, promise: Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timeoutPromise = new Promise<T>((_, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('Timeout'));
    }, milliseconds);
  });

  return Promise.race([promise, timeoutPromise]);
}

// Example usage:
const exampleFunction = async (signal: AbortSignal) => {
  // Simulate a long-running task
  await new Promise((resolve, reject) => {
    // Check if aborted before resolving
    if (signal.aborted) {
      reject(new Error('Aborted'));
      return;
    }

    // Simulate a long-running task
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve('Task completed!');
    }, 2500);
  });
};

const timeoutMilliseconds = 100; // 100ms 0.1s

const controller = new AbortController();
const signal = controller.signal;

// timeout(timeoutMilliseconds, exampleFunction(signal))
//   .then((result) => console.log('Function completed within the timeout:', result))
//   .catch((error) => console.log('Function timed out or aborted:', error.message));

