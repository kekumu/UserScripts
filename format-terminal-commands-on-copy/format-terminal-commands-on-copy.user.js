// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

// ==UserScript==
// @namespace   https://gitlab.com/kekumu/userscripts
// @name        Format terminal commands on copy
// @description Automatically remove bash comments `#` and prompts `$` on copy by reading the modifying the selected content.
// @version     1.0.3
// @copyright   2020, kekumu (https://github.com/kekumu)
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.html
// @homepage    https://gitlab.com/kekumu/userscripts/-/tree/master/format-terminal-commands-on-copy
// @supportURL  https://gitlab.com/kekumu/userscripts/-/issues?label_name[]=format-terminal-commands-on-copy
// @include     *
// @grant       none
// ==/UserScript==
// ==OpenUserJS==
// @author      kekumu
// ==/OpenUserJS==

(() => {
  "use strict";

  function copyHandler(event) {
    const selection = document.getSelection();

    let lines = selection.toString().split('\n').reduce((res, line) => {
        if (line[0] !== '#') { // Remove lines that start with '#' (comments)
          res.push(line.replace(/^\$ /, '')); // Remove '$ ' prompt
        }
        return res;
      }, []);

    event.clipboardData.setData('text/plain', lines.join('\n'));
    event.preventDefault();
  }

  document.addEventListener('copy', copyHandler);
})();
