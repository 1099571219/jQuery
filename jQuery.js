window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {  // 重载
      if (selectorOrArray[0] === '<') { 
        // 创建div
        elements = [createElement(selectorOrArray)]
      } else {
        // 查找 div
        elements = document.querySelectorAll(selectorOrArray)
      }
      elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
      elements = selectorOrArray
    } else {
      elements = selectorOrArray
    }
    const api = Object.create(jQuery.fn)
    Object.assign(api, {
      elements: elements,
      oldApi: selectorOrArray.oldApi
    })
    return api
  };
  jQuery.fn = jQuery.prototype = {
    jQuery: true,
    constructor: jQuery,
    find(selector) {
      let array = []
      this.each((node) => {
        array = array.concat(Array.from(document.querySelectorAll(selector)))
      })
      array.oldApi = this
      return jQuery(array)
    },
    each(fn) {
      for (let i = 0; i < this.elements.length; i++) {
        fn.call(null, this.elements[i], i)
      }
      return this
    },
    parent() {
      let array = []
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode)
        }
      })
      return jQuery(array)
    },
    children() {
      let array = []
      this.each((node) => {
        array.push(...node.children)
      })
      return jQuery(array)
    },
    siblings() {
      let array = []
      let array1 = []
      this.each((node) => {
        array.push(...node.parentNode.children)
      })
      for (let i = 0; i < array.length; i++) {
        if (array[i].className !== this.elements[0].className) {
          array1.push(array[i])
        }
      }
      return jQuery(array1)
    },
    index() {
      let array = []
      let i
      this.each((node) => {
        array.push(...node.parentNode.children)
      })
      for (i = 0; i < array.length; i++) {
        if (array[i].className === this.elements[0].className) {
          break
        }
      }
      return jQuery(i)
    },
    next() {
      let array = []
      let next
      this.each((node) => {
        array.push(...node.parentNode.children)
      })
      for (let i = 0; i < array.length; i++) {
        if (array[i].className === this.elements[0].className) {
          next = array[i].nextElementSibling
        }
      }
      return jQuery(next)
    },
    prev() {
      let array = []
      let prev
      this.each((node) => {
        array.push(...node.parentNode.children)
      })
      for (let i = 0; i < array.length; i++) {
        if (array[i].className === this.elements[0].className) {
          prev = array[i].previousElementSibling
        }
      }
      return jQuery(prev)
    },
    print() {
      return console.log(this.elements)
    },
    addClass(className) {
      this.each((node) => {
        node.classList.add(className)
      })
      return this
    },
    end() {
      return this.oldApi
    }
  }
  // $div.text(?) 读写文本内容
  // $div.html(?) 读写 HTML 内容
  // $div.attr('title',?) 读写属性
  // $div.css({ color: 'red' }) 读写style
  // $div.addClass('blue')
  // $div.on('click', fn)
  // $div.off('click', fn)
