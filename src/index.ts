const ALLOWED_PROPERTIES: StyleProperty[] = ['accent-color', 'align-content', 'align-items', 'align-self', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backdrop-filter', 'backface-visibility', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-position-x', 'background-position-y', 'background-repeat', 'background-size', 'block-size', 'border-block-end-color', 'border-block-end-style', 'border-block-end-width', 'border-block-start-color', 'border-block-start-style', 'border-block-start-width', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-end-end-radius', 'border-end-start-radius', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-inline-end-color', 'border-inline-end-style', 'border-inline-end-width', 'border-inline-start-color', 'border-inline-start-style', 'border-inline-start-width', 'border-left-color', 'border-left-style', 'border-left-width', 'border-right-color', 'border-right-style', 'border-right-width', 'border-start-end-radius', 'border-start-start-radius', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'bottom', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'column-count', 'column-gap', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'content', 'cursor', 'cx', 'cy', 'direction', 'display', 'dominant-baseline', 'empty-cells', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'flex-basis', 'flex-direction', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'flood-color', 'flood-opacity', 'font-family', 'font-kerning', 'font-optical-sizing', 'font-size', 'font-stretch', 'font-style', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-weight', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column-end', 'grid-column-gap', 'grid-column-start', 'grid-row-end', 'grid-row-gap', 'grid-row-start', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'height', 'image-orientation', 'image-rendering', 'inline-size', 'inset-block-end', 'inset-block-start', 'inset-inline-end', 'inset-inline-start', 'isolation', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'lighting-color', 'line-break', 'line-height', 'list-style-image', 'list-style-position', 'list-style-type', 'margin-block-end', 'margin-block-start', 'margin-bottom', 'margin-inline-end', 'margin-inline-start', 'margin-left', 'margin-right', 'margin-top', 'marker-end', 'marker-mid', 'marker-start', 'mask-type', 'max-block-size', 'max-height', 'max-inline-size', 'max-width', 'min-block-size', 'min-height', 'min-inline-size', 'min-width', 'mix-blend-mode', 'object-fit', 'object-position', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-rotate', 'opacity', 'order', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow-wrap', 'overflow-x', 'overflow-y', 'overscroll-behavior-block', 'overscroll-behavior-inline', 'padding-block-end', 'padding-block-start', 'padding-bottom', 'padding-inline-end', 'padding-inline-start', 'padding-left', 'padding-right', 'padding-top', 'paint-order', 'perspective', 'perspective-origin', 'pointer-events', 'position', 'r', 'resize', 'right', 'rotate', 'row-gap', 'rx', 'ry', 'scale', 'scroll-behavior', 'scroll-margin-block-end', 'scroll-margin-block-start', 'scroll-margin-inline-end', 'scroll-margin-inline-start', 'scroll-padding-block-end', 'scroll-padding-block-start', 'scroll-padding-inline-end', 'scroll-padding-inline-start', 'shape-image-threshold', 'shape-margin', 'shape-outside', 'shape-rendering', 'stop-color', 'stop-opacity', 'stroke', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'tab-size', 'table-layout', 'text-align', 'text-align-last', 'text-anchor', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip-ink', 'text-decoration-style', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-indent', 'text-overflow', 'text-rendering', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'touch-action', 'transform', 'transform-origin', 'transform-style', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'translate', 'unicode-bidi', 'vector-effect', 'vertical-align', 'visibility', 'white-space', 'width', 'will-change', 'word-break', 'word-spacing', 'writing-mode', 'x', 'y', 'z-index', '-webkit-line-clamp', '-webkit-text-fill-color', '-webkit-text-stroke-color', '-webkit-text-stroke-width']
const ADVANCED_PROPERTIES: StyleProperty[] | string[] = ['height', 'width', 'opacity', 'border-radius', 'padding']


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

document.getElementById('textarea-clear').onclick = async (event) => {
  event.preventDefault()
  const classInput = document.getElementById('textarea') as HTMLTextAreaElement
  classInput.value = ''
}



// controls the process for each element
const processController = async () => {
  const selectedElement = await webflow.getSelectedElement()
  if (!selectedElement) return statusController('ERROR', 'No element selected')

  // if selected continue
  statusController('LOADING', 'Processing styles...')

  // disable apply button
  buttonContoller.disable()

  const webflowStyleClass = await stylesConverter()
  if (!webflowStyleClass) return buttonContoller.enable()

  statusController('LOADING', 'Applying stylesssas...')

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

  if (!styles.trim()) {
    statusController('NO_SELECT', 'Please add css properties')
    return null
  }

  // get style name from input
  const inputClass = document.getElementById('class-input') as HTMLInputElement

  const styleObject: Style = webflow.createStyle(inputClass.value.trim() || `random-${getStyleIndex()}`)
  await dataProcessor(styles, styleObject)

  return styleObject
}

// sub functions - (data)
const dataProcessor = async (data: string, styleClass: Style) => {
  const lines = data.split(';');

  // Process each line
  lines.forEach(async line => {
    // Split each line into property and value
    const [property, ...valueParts] = line.split(':').map(part => part.trim());

    // Check if both property and value are present
    if (property && valueParts.length > 0) {
      if (isValidProperty(property)) {

        const isAdvancedProperty = ADVANCED_PROPERTIES.find(item => item === property)
        if (isAdvancedProperty) {

          advancedDataProcessor(styleClass, property as StyleProperty, valueParts.join(':'))

        } else {
          styleClass.setProperty(property as StyleProperty, valueParts.join(':'), { breakpoint: 'main', pseudo: 'noPseudo' });
        }

      }
    }
  });

  function isValidProperty(property: string): boolean {
    const valid_properties = ADVANCED_PROPERTIES.concat(ALLOWED_PROPERTIES)
    const item = valid_properties.find(item => item === property)
    if (item) return true
    else return false
  }
}

// const applyStyles = async (data: webflowStyleProperty[]) => {



//   const inputClass = document.getElementById('class-input') as HTMLInputElement
//   const newClassName = inputClass.value.trim() || `random-${getStyleIndex()}`

//   const webflowStyleClass = webflow.createStyle(newClassName);

//   data.forEach(async (style) => {
//     webflowStyleClass.setProperty(style.property, style.value, { breakpoint: 'main', pseudo: 'noPseudo' })
//   })

//   // creating class in webflow
//   await webflowStyleClass.save()
//   // returning class
//   return webflowStyleClass
// }


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




// advanced data processor
async function advancedDataProcessor(styleClass: Style, property: StyleProperty | string, value: string) {

  // height and width advanced settings
  if (property === 'height' || property === 'width') {
    /* -- for height -- */
    if (property === 'height') {
      let heightAllowed: boolean;
      const localHeightValue = await getDataFromLocalStorage_I('height');
      if (typeof (localHeightValue) === "boolean") heightAllowed = localHeightValue;
      if (heightAllowed) styleClass.setProperty(property, value);
    }
    /* -- for width -- */
    else {
      let widthAllowed: boolean;
      const localWidthValue = await getDataFromLocalStorage_I('width');
      if (typeof (localWidthValue) === "boolean") widthAllowed = localWidthValue;
      if (widthAllowed) styleClass.setProperty(property, value);
    }


  }
  /* -- for opacity -- */
  else if (property === 'opacity') {
    if (value !== 'var(--line, 1)') {
      styleClass.setProperty(property, value);
    }
  }

  /* -- for border --*/
  else if (property === 'border-radius') {
    const webflowBorderRadiusProperties: StyleProperty[] = [
      'border-start-end-radius',
      'border-start-start-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-end-end-radius',
      'border-end-start-radius'
    ]

    webflowBorderRadiusProperties.map(item => {
      styleClass.setProperty(item, value);
    })
  }

  /* -- for padding -- */
  else if (property === 'padding') {
    const webflowPaddingProperties: StyleProperty[] = [
      'padding-block-end',
      'padding-block-start',
      'padding-bottom',
      'padding-inline-end',
      'padding-inline-start',
      'padding-left',
      'padding-right',
      'padding-top'
    ];

    webflowPaddingProperties.map(item => {
      styleClass.setProperty(item, value);
    })
  }

}