/**
 * Función para reemplazar document.getElementById('id') -> $('id')
 * @param {String} id HTML Element ID
 */
export default function $(id) {
    return document.getElementById(id);
}