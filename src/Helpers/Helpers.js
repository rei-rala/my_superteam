// Esta funcion nos permitira acceder a nesting en arrays y otras validaciones =P
export const tryParseInt = (numberLike) => {
  return (
    isNaN(parseInt(numberLike))
      ? numberLike
      : parseInt(numberLike)
  )
}

export const replaceImgNotFound = (ev) => {
  ev.target.onerror = null;
  ev.target.src = "/images/notfound.png";
}