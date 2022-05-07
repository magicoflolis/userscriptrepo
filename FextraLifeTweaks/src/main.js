/* eslint-env greasemonkey */
const err = (...error) => {
  console.error("[%cFLT%c] %cERROR","color: rgb(180, 178, 176);","","color: rgb(249, 24, 128);",...error)
},
info = (...message) => {
  if(!debug) {
    return;
  };
  console.info("[%cFLT%c] %cINF","color: rgb(180, 178, 176);","","color: rgb(0, 186, 124);",...message)
},
log = (...message) => {
  if(!debug) {
    return;
  };
  console.log("[%cFLT%c] %cDBG","color: rgb(180, 178, 176);","","color: rgb(255, 212, 0);",...message)
},
ael = (elm = document, event, callback) => {
  return elm.addEventListener(event, callback);
},
create = (element, type, cname, iname, value) => {
  let el = document.createElement(element);
  type !== "none" ? (el.type = type) : false;
  cname ? (el.className = cname) : false;
  iname ? (el.id = iname) : false;
  value ? (el.value = value) : false;
  return el;
},
loadCSS = (css, name = "common") => {
  info("injecting CSS");
  document.head.insertAdjacentHTML('beforeend', `<style id="flt-${name}">${css}</style>`);
},
// observe = (element, callback, options = {subtree:true,childList:true}) => {
//   let observer = new MutationObserver(callback);
//   callback([], observer);
//   observer.observe(element, options);
//   return observer;
// },
query = async element => {
  while (document.querySelector(element) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return document.querySelector(element);
},
qs = (element) => {
  return document.querySelector(element);
},
qsA = (element) => {
  return document.querySelectorAll(element);
},
cmt_btn = create("input", "button", "btn btn-default btn-xs", "cmt-btn", "Comments"),
top_btn = create("input", "button", "btn btn-default btn-xs", "top-btn", "Top"),
main = () => {
try {
  info("Running script");
  // let r = qsA("iframe");
  // r.forEach((item, i) => {
  //   r[i].setAttribute("style",'content: "" !important;display: none !important;visibility: hidden !important;margin: 0px 0px 0px 0px !important;padding: 0px 0px 0px 0px !important;width: 0px !important;max-width: 0px !important;min-width: 0px !important;height: 0px !important;max-height: 0px !important;min-height: 0px !important;');
  // });
  loadCSS(fltCSS);
  query("#wrapper").then((wrapper) => {
    if(Remove_Clutter) {
      info("Removing clutter");
      wrapper.setAttribute("style", "padding-left: 0px !important");
      //".wrap > script:nth-child(2)"
      // "body > script:nth-child(6)"
      // query("#sidebar-wrapper").then((sw) => sw.remove());
      qsA("ul").forEach((item, i) => {
        qsA("ul")[i].setAttribute("style", "max-width: 100% !important");
      });
      // observe(document.body, () => Remover());
    };
    query("button#btnPostCommentu").then((dw) => {
      if(DisableComments) {
        info("Hiding comments");
        qs(".discussion-wrapper").setAttribute("style",'display: none !important');
      } else {
        ael(cmt_btn,"click", () => {
          return dw.scrollIntoView();
        });
      };
    });
    ael(top_btn,"click", () => {
      return wrapper.scrollIntoView();
    });
    info("injecting buttons...");
    wrapper.append(top_btn,cmt_btn);
    (AutoScroll) ? qs("#page-content-wrapper").scrollIntoView() : false;
    ael(document,"scroll", () => {
      return (document.documentElement.scrollTop > Scroll_Amount) ? (
        top_btn.setAttribute("style",'top: 90% !important'),
        !DisableComments ? cmt_btn.setAttribute("style",'top: 90% !important') : false
        ) : (
          top_btn.setAttribute("style",'top: 100% !important'),
          !DisableComments ? cmt_btn.setAttribute("style",'top: 100% !important') : false
          );
    });
    info("Done!");
  });
  } catch (e) {
    error(e)
  };
};

ael(window,"load",main);