export const digestMessage = async (message) => {
  const encode = new TextEncoder();

  const hashed = new Promise((resolve, reject) => {
    message && resolve(message)
    !message && reject('No se obtuvo input')
  })
    .then(msg => encode.encode(msg))
    .then(encoded => crypto.subtle.digest('SHA-256', encoded))
    .then(algo => new Uint8Array(algo))
    .then(algo => Array.from(algo))
    .then(algo => algo.map(b => b.toString(16).padStart(2, '0')).join(''))
    .catch(err => console.error(err))

  return hashed
}

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