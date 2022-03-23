/**
 * Фильтрует список предметов оставляя только элементы
 * согласно переданному рейтингу и типу сета
 * @param array
 * @param rating
 * @param set
 * @returns {*}
 */
export const filtered = (array, rating, set) => array.filter(el => el.rating === rating)
  .filter(el => el.name.includes(set))

/**
 * Дополнительно фильтрует список предметов оставляя только
 * элементы принадлежащие к опреленному классовому "подсету"
 * @param type
 * @param array
 * @param rating
 * @param set
 * @returns {*}
 */
export const disciplineItems = (type, array, rating, set) => filtered(array, rating, set)
  .filter(el => el.name.includes(type))

/**
 * Дополнительно фильтрует список предметов оставляя только
 * элементы содержащие указанный атрибут
 * @param attribute
 * @param array
 * @param rating
 * @param set
 * @returns {*}
 */
export const attributeItems = (attribute, array, rating, set) => filtered(array, rating, set)
  .filter(el => el.statmodifiers.includes(attribute))
