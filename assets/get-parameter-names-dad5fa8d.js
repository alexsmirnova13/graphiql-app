var t=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;function n(a){var e=a.toString().replace(t,""),r=e.slice(e.indexOf("(")+1,e.indexOf(")")).match(/([^\s,]+)/g);return r===null?[]:r}var s=n;export{s as g};
