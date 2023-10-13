// Defaults
let defaults = {
  maxTextLength: 3,
  text: '',
  isFilled: false,
  letterColor: '#bbb',
  spacing: 10,
  scale: 100,
  backgroundColor: "#ccc",
  niceColors: ["#607cc9", "#97dadb", "#4dff3d", "#7073e0", "#35ce4a", "#7cf966", "#172684", "#ccf1ff", "#69ef8d", "#efcc07", "#d1177d", "#e56439", "#c1154b", "#04a08b", "#ef1cd7", "#99aaef", "#db64bf", "#d89f2d", "#9ff4b3", "#c15b28", "#d236f9", "#2dd8a8", "#0430f2", "#5282ce", "#faffaa", "#ed7476", "#aefcb7", "#f73ba5", "#efb29e", "#72f9c3", "#1d50d1", "#83a00e", "#ea9859", "#3cfc5f", "#fff6ba", "#bf6d3b", "#f7678b", "#4925a3", "#d30225", "#e5c914", "#c4ffb2", "#f2c5b3", "#56c1ef", "#d6ef56", "#63e1ed", "#efafac", "#1228ce", "#a8caf7", "#b2ffea", "#c60f83"],
  getNiceColor() {
    return this.niceColors[Math.floor(Math.random() * this.niceColors.length)];
  }
};

// Vuex
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    text: defaults.text,
    isFilled: defaults.isFilled,
    spacing: defaults.spacing,
    scale: defaults.scale,
    colors: {
      letters: [defaults.letterColor, defaults.letterColor, defaults.letterColor],
      background: defaults.backgroundColor
    },
    letters: {
      a: { width: 130, d: "M87.78,104.91H42.21L33.47,122H0L65.09,0,130,122H96.53ZM76.07,82l-11-21.39L53.93,82Z" },
      b: { width: 102, d: "M102,86.9c0,32.29-35.32,35.1-35.32,35.1H0V0H56.86s28,0,34.94,23.84a34.93,34.93,0,0,1-4.9,29.85S102,60.44,102,86.9Zm-72.54-37H55.73a13.61,13.61,0,1,0,0-27.22H29.46ZM65.35,72.26H29.46V99.47H65.35A13.5,13.5,0,0,0,79,86,13.67,13.67,0,0,0,65.35,72.26Z" },
      c: { width: 102, d: "M102,107.6A63.06,63.06,0,0,1,61.83,122C27.76,122,0,94.65,0,61.09,0,27.35,27.76,0,61.83,0A62.22,62.22,0,0,1,102,14.58L83.49,32.64a36.2,36.2,0,0,0-21.66-7.11A35.71,35.71,0,0,0,36.47,35.92,35.09,35.09,0,0,0,25.92,61.09a34.65,34.65,0,0,0,10.55,25A35.71,35.71,0,0,0,61.83,96.47a36.2,36.2,0,0,0,21.66-7.11Z" },
      d: { width: 108, d: "M108,61c0,33.59-27.56,61-61.36,61H0V0H46.64A61.18,61.18,0,0,1,108,61ZM79.67,61A32.78,32.78,0,0,0,46.44,28h-17V93.85H46.64a33,33,0,0,0,23.41-9.57A32.54,32.54,0,0,0,79.67,61Z" },
      e: { width: 86,  d: "M29.55,95.72H86V122H0V0H86V26.28H29.55V47.86H77.48V74.14H29.55Z" },
      f: { width: 76,  d: "M29.49,26.29V47.86h34.6V74.14H29.49V122H0V0H76V26.29Z" },
      g: { width: 120, d: "M120,51.53V122H96.44l-.08-11.3a61,61,0,1,1,4.19-96.13l-18.18,18a36.13,36.13,0,0,0-21.46-7.1A34.39,34.39,0,0,0,36,35.88,35.5,35.5,0,0,0,60.91,96.5,35.88,35.88,0,0,0,86,86.12c1.27-1.27,6.54-6.73,8.18-10.91H66.91V51.53H120ZM96.36,75.39v-.18h-.18Z" },
      h: { width: 96,  d: "M96,0V122H66.52V74.14h-37V122H0V0H29.48V47.86h37V0Z" },
      i: { width: 30,  d: "M30,0V122H0V0Z" },
      j: { width: 34,  d: "M11.62,0H34V89.4C34,110.31,28.12,122,0,122V100.54c6.6,0,11.62-3.43,11.62-11.14Z" },
      k: { width: 116, d: "M39,76.6L26.7,90.1V122H0V0h26.7v48.6L77.7,0H116L58,55.7l58,66.3H78.1L39,76.6z" },
      l: { width: 88,  d: "M88,95.73V122H0V0H29.27V95.73Z" },
      m: { width: 130, d: "M130,0V122H100.69V53.69L64.44,76.76,29.31,53.87V122H0V0L64.81,41.86Z" },
      n: { width: 110, d: "M110,0v122L29.3,62.5V122H0V0l80.7,62.3V0H110z" },
      o: { width: 122, d: "M122,61A61,61,0,1,1,61,0,61,61,0,0,1,122,61ZM96.52,61A35.51,35.51,0,1,0,35.87,86.13a35.62,35.62,0,0,0,50.27,0A35.28,35.28,0,0,0,96.52,61Z" },
      p: { width: 102, d: "M102,41.68c0,17.25-11.63,41.47-43.88,41.47H29.25V122H0V0H58.5C88.5,0,102,22.89,102,41.68Zm-26.25,0a16.71,16.71,0,0,0-3.94-10.52c-3-3.38-7.31-4.87-13.31-4.87H29.25V56.87H58.12a24.56,24.56,0,0,0,9.76-1.68,18.59,18.59,0,0,0,4.3-3.2A17.14,17.14,0,0,0,75.75,41.68Z" },
      q: { width: 120, d: "M100.12,122,89.37,111.34A60.13,60.13,0,0,1,60,119C26.86,119,0,92.34,0,59.49S26.86,0,60,0s60,26.64,60,59.49a60.36,60.36,0,0,1-10,33l10,9.8ZM70.39,92.52,59.82,82.05l19.7-19.71,12,11.88a32.3,32.3,0,0,0,3.4-14.73A34.27,34.27,0,0,0,84.72,35a35.25,35.25,0,0,0-49.44,0,34.55,34.55,0,0,0,0,49A35.61,35.61,0,0,0,60,94.12,33.37,33.37,0,0,0,70.39,92.52Z" },
      r: { width: 104, d: "M76.8,80.34,103.62,122H70.1l-26-38.85H29.88V122H0V0H59.57C90.21,0,104,22.9,104,41.68,104,55.37,96.53,73.57,76.8,80.34ZM29.88,56.87H59.37a24.48,24.48,0,0,0,9.77-1.68A15.56,15.56,0,0,0,73.55,52a16.93,16.93,0,0,0,3.64-10.31,15.55,15.55,0,0,0-4-10.52c-2.88-3.38-7.29-4.88-13.6-4.88H29.88Z" },
      s: { width: 96,  d: "M26.62,118.6a51.64,51.64,0,0,1-14.7-9.5C-1.71,96.56.08,79.9.08,78.29l24.56.35v-.17s0,6.62,2.88,10.93q5.37,8.07,19.89,8.06c16.14,0,23.31-4.13,23.31-10.92,0-7.18-9.14-11.66-24-13.26A89.93,89.93,0,0,1,23,67.54a41.12,41.12,0,0,1-14.88-10A30,30,0,0,1,.08,36.72c0-10.93,4.3-18.27,8.07-22.57C16.4,4.83,29.66,0,48,0c24,0,35.86,10.56,41.6,19.34C95.64,28.84,96,39.77,96,41.56H71.44v.18s.18-5.37-2.69-9.14c-3.58-5-10.76-8.06-20.8-8.06-10.4,0-22.41,2.7-22.41,10.57,0,7.53,7.89,12,23.85,13.8,17.75,2,30.84,7.52,38.73,16.66a31.81,31.81,0,0,1,7.88,21,31.13,31.13,0,0,1-7.71,21.85,37.2,37.2,0,0,1-16,10.21c-6.82,2.34-15.06,3.4-24.93,3.4A58,58,0,0,1,26.62,118.6Z" },
      t: { width: 94,  d: "M61.84,29.28V122H32.16V29.28H0V0H94V29.28Z" },
      u: { width: 104, d: "M104,0V70.39C104,103.05,75.38,122,51.81,122,30.11,122,0,104.55,0,70V0H27.12V70c0,7.5,2.62,13.51,8.05,18,5.42,4.69,12.34,6.75,16.64,6.75a28.16,28.16,0,0,0,8.42-1.68A29.57,29.57,0,0,0,69,87.84a24.73,24.73,0,0,0,5.8-7.5,21.67,21.67,0,0,0,2.05-10V0Z" },
      v: { width: 132, d: "M66.1,122v-.18l-.2.18v-.18L0,0H34L66.1,60.81,98,0h34L66.1,121.82Z" },
      w: { width: 172, d: "M172,0,107,122,86,82.59,65,122,0,0H33.43L65,61l4.64-9L42,0H75.41L107,61,138.56,0Z" },
      x: { width: 122, d: "M81.71,61,122,101.35,101.2,122,60.91,81.65,20.62,122,0,101.35,40.29,61,0,20.65,20.8,0,60.91,40.17,101.2,0,122,20.65Z" },
      y: { width: 126, d: "M77.38,58.94V122H48.43V58.94L0,0H38L63.09,30.6,88,0H126Z" },
      z: { width: 102, d: "M102,26,35.85,95.82H102V122L0,121.82v-26L66.14,26H0V0H102Z" }
    }
  },
  mutations: {
    updateLetterColors (state, payload) {
      let temp = state.colors.letters.slice(0);
      temp[payload.number] = payload.value;
      state.colors.letters = temp;
    },
  },
  getters: {
    text(state) { return state.text.toLowerCase(); },
  }
})


// Vue Components
Vue.component('download-button', {
  props: ['hideFor'],
  template: `<button @click="download" :class="'is-hidden-' + hideFor" class="button is-fullwidth download with-box-shadow has-text-weight-semibold">
              <span class="icon is-small is-marginless" style="margin-left: -8px !important">
                <svg style="width: 15px; height: 15px;" aria-hidden="true" data-prefix="fas" data-icon="arrow-alt-circle-down" class="svg-inline--fa fa-arrow-alt-circle-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#345171" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
              </span>
              Download
            </button>`,
  methods: {
    download() {
      this.$emit('download');
    },
  }
});

Vue.component('color-input', {
  props: ['number', 'title'],
  data: function () {
    return {
      value: '',
      placeholder: '',
      pickedValue: this.placeholder,
      isFocused: false,
    }
  },
  template: `<div class="field color-field">
              <label :class="{'with-circle': number === 3}" class="label has-text-weight-normal">{{ title }}</label>
              <div class="control">
                <input type="text" maxlength="7" class="input has-icons-right"
                  v-model="value"
                  @focus="isFocused = true"
                  @blur="onBlur"
                  :class="{'is-danger': !isCorrect && !isFocused && value.length}"
                  :placeholder="placeholder">
                  <span v-show="isCorrect" class="is-correct-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#DBDBDB" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                  </span>
                <div class="demo-color" :style="{'background-color': value}">
                  <input tabindex="-1" type="color" @input="onPick" @click="onClick" v-model="pickedValue">
                </div>
              </div>
            </div>`,
  computed: {
    isCorrect() {
      return !!this.value.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
    }
  },
  methods: {
    onBlur() {
      this.isFocused = false;
      if (this.value.match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
        this.value = '#' + this.value;
      }
    },
    onClick() { this.pickedValue = "#ffffff"; },
    onPick() { this.value = this.pickedValue; },
    dispatchValue() {
      if (this.number < 3) {
        store.commit('updateLetterColors', {number: this.number, value: this.value});
      } else {
        store.state.colors.background = this.value;
      }
    }
  },
  watch: {
    value() {
      if (this.isCorrect) {
        this.dispatchValue();
      }
    }
  },
  mounted() {
    this.placeholder = defaults.getNiceColor();
    this.pickedValue = defaults.getNiceColor();
  }
});

Vue.component('text-input', {
  props: ['name', 'placeholder'],
  data: function () {
    return {
      value: '',
      pickedValue: this.placeholder,
    }
  },
  template: `<div class="field text-field">
              <label class="label has-text-weight-normal">Letters</label>
              <div class="control wide">
                <input type="text" @paste="onPaste" @keydown="onKeydown" :maxlength="defaults.maxTextLength" class="input has-icons-right" v-model="value" :placeholder="placeholder">
                  <span class="is-correct-icon">
                    <svg v-show="isCorrect" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#DBDBDB" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                  </span>
              </div>
            </div>`,
  computed: {
    isCorrect() {
      return this.value.length > 0;
    }
  },
  methods: {
    onPaste(e) {
      e.preventDefault();
    },

    onKeydown(e) {
      let engLetters = /[a-z]/
      if ([8, 37, 39, 46].includes(e.keyCode) || engLetters.test(e.key.toLowerCase())) return true;
      e.preventDefault();
    },
  },
  watch: {
    value(text) { store.state.text = text; }
  }
})

Vue.component('range-input', {
  props: ['title', 'min', 'max', 'initValue', 'param'],
  template: `<div class="field range-field">
              <label class="label has-text-weight-normal">{{ title }}</label>
              <div class="range-wrap">
                <input type="range" :min="min" :max="max" v-model="paramVal">
              </div>
            </div>`,
  computed: {
    paramVal: {
      get () { return store.state[this.param]; },
      set (value) { store.state[this.param] = value; }
    }
  }
})


// Vue App
var app = new Vue({
  el: '#logo-generator-app',
  data: {
    canvas: undefined,
    drawingTimout: undefined,
    defaults: defaults
  },
  computed: {
    colors() { return store.state.colors.letters; },
    text() { return store.getters.text; },
    letters() { return store.state.letters; },
    background() { return store.state.colors.background; },
    spacing() { return store.state.spacing; },
    scale() { return store.state.scale / 100; },
    isFilled: {
      get () { return store.state.isFilled; },
      set (value) { store.state.isFilled = value; }
    }
  },

  methods: {
    getLetter(position) {
      return this.letters[this.text.charAt(position)];
    },

    draw() {
      if (this.drawingTimout) {
        clearTimeout(this.drawingTimout);
        this.drawingTimout = null;
      }
      this.drawingTimout = setTimeout(() => {
        if (this.canvas.children.length) this.canvas.innerHTML = '';
        html2canvas(document.getElementById('logo-constructor'), {backgroundColor: null}).then(canvas => {
          if (this.canvas.children.length) this.canvas.innerHTML = '';
          this.canvas.appendChild(canvas);
        });
      }, 500);
    },

    download() {
      this.canvas.firstChild.toBlob((blob) => {
        saveAs(blob, `${this.text || 'logo'}.png`);
      });
    },
  },
  watch: {
    colors: {
      handler() { this.draw(); },
      deep: true
    },

    text(value) {
      let missingLetter = defaults.maxTextLength - value.length;
      for (let i = 1; i <= missingLetter; i++) {
        store.commit('updateLetterColors', {number: defaults.maxTextLength - i, value: defaults.letterColor })
      }
      this.draw();
    },

    scale() { this.draw() },
    spacing() { this.draw() },
    background() { this.draw() },
    isFilled() { this.draw() },
  },
  mounted() {
    this.canvas = document.getElementById('canvas');
    this.draw();
  }
})
