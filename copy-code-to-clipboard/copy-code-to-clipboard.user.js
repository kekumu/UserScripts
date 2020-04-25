// ==UserScript==
// @name        Copy Code to Clipboard
// @namespace   org.kekumu
// @match       *://*/*
// @version     0.1.1
// @author      kekumu
// @description Select and copy code snippets in a logical way and convenient way. Quadruple click to select code. Automatically removes bash comments (#) and prompts ($) on copy.
// @grant       GM_addStyle
// ==/UserScript==

const els = [...document.querySelectorAll('code, pre')];

function quadClickHandler(event) {
  if (event.detail === 4) {
    for (const el of els) {
      if (el.contains(event.target)) {
        event.preventDefault();
        window.getSelection().selectAllChildren(el);
        break;
      }
    }
  }
}

function copyHandler(event) {
  const selection = document.getSelection();
  let lines = selection.toString().split('\n').reduce((res, line) => {
      if (!line.startsWith('#')) {
        res.push(line.replace(/^\$ /, ''));
      }
      return res;
    }, []);
  event.clipboardData.setData('text/plain', lines.join('\n'));
  event.preventDefault();
}

document.addEventListener('mousedown', quadClickHandler);
els.map(el => el.addEventListener('copy', copyHandler));
