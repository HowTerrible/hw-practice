var pub = (
  function () {

    const pool = {}
    function on(name, func) {
      const funcArr = pool[name];
      if (!funcArr) {
        pool[name] = [func]
      } else {
        if (funcArr.includes(func)) {
          return
        } else {
          funcArr.push(func)
        }
      }
    }

    function off(name, func) {
      const funcArr = pool[name];
      if (!funcArr || !funcArr.includes(func)) {
        return;
      } else {
        const index = funcArr.indexOf(func);
        funcArr[index] = null
      }
    }

    function emit(name, ...params) {
      const funcArr = pool[name];
      for (let i = 0; i < funcArr.length; i++) {
        const temp = funcArr[i];
        if (typeof temp === "function") {
          temp.call(null, ...params)
        } else {
          funcArr.splice(i, 1);
          i--
        }
      }
    }

    return {
      on, off, emit
    }
  }
)()

function a1(a, b) {
  console.log("a1", a, b);
}
function a2(a, b, c) {
  console.log("a2", a, b, c)
}
function a3() {
  console.log("a3");
  pub.off("click", a1);
  pub.off("click", a3);
}

pub.on("click", a1);
pub.on("click", a2);
pub.on("click", a3);

pub.emit("click", 1, 2, 3)


pub.emit("click", 1, 2, 3)