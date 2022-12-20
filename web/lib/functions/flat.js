/**
* Our edges are nested, so we need to deeply flatten the array
* @param {*} array 
* @returns array
*/
export function flat(array) {
  var result = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}