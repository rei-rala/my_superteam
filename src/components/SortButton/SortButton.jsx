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
  const [sortType, setSortType] = useState(['none', 'none'])
  const manageSortState = ([orden, razon]) => setSortType([orden, razon])

  // Esta funcion nos permitira acceder a nesting en arrays
  const tryParseInt = (numberLike) => {
    return (
      isNaN(parseInt(numberLike))
        ? numberLike
        : parseInt(numberLike)
    )
  }

  // ? nuestra verdadera funcion encargada del orden, para invocarla hay que enviarle de argumento: sortableThingy = toSort, manageDisplay=displayFunction, sortBy=sortingTerm (ver linea 48!!!)
  const toggleSort = (sortableThingy, manageDisplay, sortBy) => {
    // Encerramos en un bloque try por si las dudas
    try {
      // En caso de tener nesting de propiedades (separados por puntos), tendremos un array de niveles
      const sortLevels = sortBy.split('.')
      // Ultimo nivel
      const lastLevel = sortLevels.slice(-1).pop() || sortBy

      // Compruebo si existe lo que vamos a hacer sort
      // Comprobacion de que NO este ordenado de forma ascendente y por la razon del sort
      // ? notar que vamos a ejecutar la actualizacion del state que haga managment con manageSortState de la lista de productos
      if (sortableThingy && sortType[0] !== 'descendente' && sortType[1] === lastLevel) {
        //  si se cumple, deducimos que esta ordenado descendentemente o NO ordenado, entonces lo ordenamos ascendente
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

          // Las variables mutadas ahora son comparables, en caso de propiedad inexistente(undefined), no hara ningun cambio
          return tryParseInt(preSortB) > tryParseInt(preSortA) ? 1 : -1
        }))
        manageSortState(['descendente', lastLevel])
      }

      else {
        // En caso contrario, seguro este ordenado ascendentemente, entonces lo ordenamos descendentemente
        manageDisplay(sortableThingy.sort((a, b) => {
          let preSortA = a
          let preSortB = b

          for (let nestingLevel of sortLevels) {
            nestingLevel = tryParseInt(nestingLevel)

            preSortA = preSortA[nestingLevel]
            preSortB = preSortB[nestingLevel]

          }

          return tryParseInt(preSortA) > tryParseInt(preSortB)
            ? 1
            : -1
        }))
        manageSortState(['ascendente', lastLevel])

      }
    }
    // Si falla, entendemos que lo que le pasamos no es ordenable o fallo algo en la FN, lo imprimimos en consola
    catch (err) {
      // En un console warn porque con ERROR nos tira el cartel de react =B
      console.warn(`${sortableThingy} no es ordenable con este metodo.\nError: ${err}`)
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
              className={(sortType[1] === sortingTerm.split('.').pop() ? 'currentSort ' : '') + 'sortBtn'}
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
                sortType[1] !== sortingTerm.split('.').pop()
                  ? null
                  : sortType[0] !== 'ascendente' && sortType[1] === sortingTerm.split('.').pop()
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                      <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
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