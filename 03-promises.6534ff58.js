!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var i=o("h6c0i");i.Notify.init({width:"250px",position:"right-top",useIcon:!1,timeout:5e3});var r={firstDelay:document.querySelector("input[name=delay]"),delayStep:document.querySelector("input[name=step]"),amount:document.querySelector("input[name=amount]"),submit:document.querySelector("form")};function u(e,t){var n=Math.random()>.3;return new Promise((function(o,i){setTimeout((function(){n?o({position:e,delay:t}):i({position:e,delay:t})}),t)}))}r.submit.addEventListener("submit",(function(e){e.preventDefault();for(var t=r.amount.value,n=Number(r.firstDelay.value),o=Number(r.delayStep.value),a=0,l=n-o,c=1;c<=t;c+=1)u(a+=1,l+=o).then((function(e){var t=e.position,n=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;i.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}));r.submit.reset()}))}();
//# sourceMappingURL=03-promises.6534ff58.js.map
