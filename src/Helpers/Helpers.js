export const digestMessage = async (message) => {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
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