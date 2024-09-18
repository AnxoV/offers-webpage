export const $ = function(query, parent = document) {
    return document.querySelector(query);
}

export const $s = function(query, parent = document) {
    return document.querySelectorAll(query);
}