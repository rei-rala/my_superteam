import React, { useState } from 'react'
import './sortButton.scss'
// ! rei - https://github.com/rei-rala


/* 
Props recibidos:

*displayFunction: es la funcion que tenemos que utilizar para cambiar nuestra lista de items visualizados (puede ser un set de useState o una funcion adicional de managment)
*toSort: es lo que vamos a ordenar, generalmente es el valor de nuestro useState
*arrayStortingTerms: es un array hardcodeado que le damos a esta prop para que cree botones para ordenar nuestro toSort, tener en cuenta que los valores del array deben ser iguales a las de nuestro producto que queramos ordenar ejemplo: ['price', 'name', 'stock'] para un producto = { price: 100, name: 'algo', stock:0}. PUEDEN ACCEDERSE A NESTED PROPIEDADES/POSICIONES MEDIANTE NOTACION DE PUNTO Ej: ['propiedad.0.propiedad', '5.propiedad'] 
*varUseEffect: es un useEffect que creamos en el componente PADRE, que cuidara que la transformacion (ordenamiento) de nuestra lista de productos impacte en el dom
*/
const SortButton = ({ toSort, displayFunction, arraySortingTerms, varUseEffect }) => {

  //primera variable es tipo de orden asc/desc, segunda variable es la razon del sort(precio, nombre, etc)
  const [sortType, setSortType] = useState({ orden: 'none', razon: 'none', esNumerico: false })
  const manageSortState = ({ orden, razon, esNumerico }) => setSortType({ orden, razon, esNumerico })

  // Esta funcion nos permitira acceder a nesting en arrays y otras validaciones =P
  const tryParseInt = (numberLike) => {
    return (
      isNaN(parseInt(numberLike))
        ? numberLike
        : parseInt(numberLike)
    )
  }

  // ? nuestra verdadera funcion encargada del orden, para invocarla hay que enviarle de argumentos: sortableThingy = toSort, manageDisplay=displayFunction, sortBy=sortingTerm
  const toggleSort = (sortableThingy, manageDisplay, sortBy) => {
    // Encerramos en un bloque try por si las dudas
    try {
      // En caso de tener nesting de propiedades (separados por puntos), tendremos un array de niveles
      const sortLevels = sortBy.split('.')
      // Ultimo nivel
      const lastLevel = sortLevels.slice(-1).pop() || sortBy

      manageDisplay(sortableThingy.sort((a, b) => {
        // Variables para mutarlas con los diferentes niveles
        let preSortA = a
        let preSortB = b

        // Iteramos en el array de niveles (para acceder al nesting de propiedades)
        for (let nestingLevel of sortLevels) {
          nestingLevel = tryParseInt(nestingLevel)

          // Mutamos las variables
          preSortA = preSortA[nestingLevel]
          preSortB = preSortB[nestingLevel]
        }

        let isNumber = !isNaN(preSortA) && !isNaN(preSortB)
        // Compruebo si existe lo que vamos a hacer sort
        // Comprobacion de que NO este ordenado de forma ascendente y por la razon del sort
        //  si se cumple, deducimos que esta ordenado descendentemente o no ordenado, entonces lo ordenamos ascendente
        if (sortableThingy && sortType.orden !== 'descendente' && sortType.razon === lastLevel) {
          // Las variables mutadas ahora son comparables, en caso de propiedad inexistente(undefined), no hara ningun cambio
          manageSortState({
            orden: 'descendente',
            razon: lastLevel,
            esNumerico: isNumber
          })
          return tryParseInt(preSortB) > tryParseInt(preSortA) ? 1 : -1
        }
        // De lo contrario y por defecto, se ordenara ascendentemente
        else {
          manageSortState({
            orden: 'ascendente',
            razon: lastLevel,
            esNumerico: isNumber
          })
          return tryParseInt(preSortA) > tryParseInt(preSortB)
            ? 1
            : -1
        }
      }))

    }
    // Si falla, entendemos que lo que le pasamos no es ordenable o fallo algo en la FN, lo imprimimos en consola
    catch (err) {
      console.info(`${sortableThingy} no es ordenable con este metodo.\nError: ${err}`)
    }
  }


  return (
    !toSort || toSort.length < 2
      // Si le damos algo con menos de 2 items, no apareceran las opciones para ordenar
      ? <></>
      : <div className="seccBtnSort">
        {/* <span>Actualmente ordenado: <i>{sortType[0] === 'none' ? 'ningun criterio' : `${sortType[1]}, ${sortType[0]}`}</i></span> */}
        <div className='sortBtnSection'>
          {
            // ? arraySortingTerms es un PROP, y debe ser el array que queremos ordenar, en lo posible administrado para su visibilizacion en el DOM 
            arraySortingTerms.map(sortingTerm => <button
              className={(sortType.razon === sortingTerm.split('.').pop() ? 'currentSort ' : '') + 'sortBtn'}
              key={sortingTerm}
              title={`Ordenar por ${sortingTerm.split('.').pop()}`}
              onClick={() => {
                toggleSort(toSort, displayFunction, sortingTerm)
                // ! Dado que algo debio cambiar, activamos la variable que escucha el useEffect
                varUseEffect()
              }
              }
            >
              {
                // ? Esta comprobacion es para alternar el contenido del boton a modo indicativo del ordenamiento activado
                sortType.razon !== sortingTerm.split('.').pop()
                  ? null
                  : sortType.orden !== 'ascendente' && sortType.razon === sortingTerm.split('.').pop()
                    ? sortType.esNumerico || (sortType === null || sortType === 'null')
                      ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                        <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                        <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                        <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                      </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                        <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                      </svg>
                    : sortType.esNumerico || (sortType === null || sortType === 'null')
                      ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-numeric-up" viewBox="0 0 16 16">
                        <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                        <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                        <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                      </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                        <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                      </svg>
              }
              <span>
                {sortingTerm.split('.').pop()}
              </span>
            </button>
            )
          }
        </div>
      </div >
  )
}

export default SortButton;