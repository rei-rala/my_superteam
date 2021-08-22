import React, { useState } from 'react'
// ! rei - https://github.com/rei-rala

import './sortButton.scss'
/* 
Props recibidos:

*displayFunction: es la funcion que tenemos que utilizar para cambiar nuestra lista de items visualizados (puede ser un set de useState o una funcion adicional de managment)
*toSort: es lo que vamos a ordenar, generalmente diria que es el valor de nuestro useState
*arrayStortingTerms: es un array hardcodeado que le damos a esta prop para que cree botones para ordenar nuestros productos, tener en cuenta que los valores del array deben ser iguales a las de nuestro producto que queramos ordenar ejemplo: ['price', 'name', 'stock'] para un producto = { price: 100, name: 'algo', stock:0}
*varUseEffect: es un useEffect que creamos en el componente PADRE, que cuidara que la transformacion (ordenamiento) de nuestra lista de productos impacte en el dom
*/
const SortButton = ({ toSort, displayFunction, arraySortingTerms, varUseEffect }) => {

  //primera variable es tipo de orden asc/desc, segunda variable es la razon del sort(precio, nombre, etc)
  const [sortType, setSortType] = useState(['none', 'none'])
  const manageSortState = ([orden, razon]) => setSortType([orden, razon])

  // ? nuestra verdadera funcion encargada del orden, para invocarla hay que enviarle de argumento: sortableThingy = toSort, manageDisplay=displayFunction, sortBy=sortingTerm (ver linea 48!!!)
  const toggleSort = (sortableThingy, manageDisplay, sortBy) => {
    // Encerramos en un bloque try por si las dudas
    try {
      // Compruebo si existe lo que vamos a hacer sort
      // Comprobacion de que NO este ordenado de forma ascendente y por la razon del sort
      // ? notar que vamos a ejecutar la actualizacion del state que haga managment con manageSortState de la lista de productos
      if (sortableThingy && sortType[0] !== 'descendente' && sortType[1] === sortBy) {
        //  si se cumple, deducimos que esta ordenado descendentemente o NO ordenado, entonces lo ordenamos ascendente
        manageDisplay(sortableThingy.sort((a, b) => b[sortBy] > a[sortBy] ? 1 : -1))
        manageSortState(['descendente', sortBy])
      } else {
        // En caso contrario, seguro este ordenado ascendentemente, entonces lo ordenamos descendentemente
        manageDisplay(sortableThingy.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1))
        manageSortState(['ascendente', sortBy])
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
              className={sortType[1] === sortingTerm ? 'currentSort' : null}
              key={sortingTerm}
              onClick={() => {
                toggleSort(toSort, displayFunction, sortingTerm)

                // ! Dado que algo debio cambiar, activamos la variable que escucha el useEffect
                varUseEffect()
              }
              }
            >
              {
                // ? Esta comprobacion es para alternar el contenido del boton a modo indicativo del ordenamiento activado
                sortType[1] !== sortingTerm
                  ? null
                  : sortType[0] !== 'ascendente' && sortType[1] === sortingTerm
                    ? '↓'
                    : '↑'
              } {sortingTerm}
            </button>
            )
          }
        </div>
      </div >
  )
}

export default SortButton;