Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    colors: {
      o: '#4A79A5',
      k: '#345171',
      n: '#4A79A5'
    }
  },
  mutations: {
    updateColor (state, payload) {
      state.colors[payload.color] = payload.value;
    }
  },
  getters: {
    colors(state) {
      return state.colors;
    }
  }
})

Vue.component('color-input', {
  props: ['name', 'title', 'placeholder'],
  data: function () {
    return {
      value: '',
      isFocused: false
    }
  },
  template: `<div class="field">
              <label class="label has-text-weight-normal" v-text="title"></label>
              <div class="control">
                <input type="text" maxlength="7" class="input has-icons-right"
                  v-model="value"
                  @focus="isFocused = true"
                  @blur="onBlur"
                  :class="{
                    'is-danger': !isCorrect & !isFocused & value.length
                  }"
                  :placeholder="placeholder">
                  <span class="is-correct-icon">
                    <svg v-show="isCorrect" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#DBDBDB" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                  </span>
                <div class="demo-color" :style="{'background-color': value}">
                  <input type="color" v-model="value">
                </div>
              </div>
            </div>`,
  computed: {
    isCorrect() {
      return this.value.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
    }
  },
  methods: {
    onBlur() {
      this.isFocused = false;
      if (this.value.match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
        this.value = '#' + this.value;
      }
    }
  },
  watch: {
    value() {
      if (this.isCorrect) {
        store.commit('updateColor', {color: this.name, value: this.value })
      }
    }
  }
})

var app = new Vue({
  el: '#logo-generator-app',
  data: {
    canvas: undefined,
    ctx: undefined,
  },
  computed: {
    colors() {
      return store.getters.colors;
    },
  },

  methods: {
    getLayout() {
      return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 426 426" style="enable-background:new 0 0 426 426;" xml:space="preserve">
        <ellipse  fill="#FFFFFF" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -88.2275 213)" cx="213" cy="213" rx="205" ry="205"/>
        <path fill="#FFFFFF" d="M213,16c26.6,0,52.4,5.2,76.7,15.5c23.5,9.9,44.5,24.1,62.6,42.2c18.1,18.1,32.3,39.2,42.2,62.6
          c10.3,24.3,15.5,50.1,15.5,76.7s-5.2,52.4-15.5,76.7c-9.9,23.5-24.1,44.5-42.2,62.6c-18.1,18.1-39.2,32.3-62.6,42.2
          C265.4,404.8,239.6,410,213,410c-26.6,0-52.4-5.2-76.7-15.5c-23.5-9.9-44.5-24.1-62.6-42.2c-18.1-18.1-32.3-39.2-42.2-62.6
          C21.2,265.4,16,239.6,16,213s5.2-52.4,15.5-76.7c9.9-23.5,24.1-44.5,42.2-62.6c18.1-18.1,39.2-32.3,62.6-42.2
          C160.6,21.2,186.4,16,213,16 M213,0C95.4,0,0,95.4,0,213s95.4,213,213,213s213-95.4,213-213S330.6,0,213,0L213,0z"/>
        <path fill="${this.colors.o}" d="M213,33c48.1,0,93.3,18.7,127.3,52.7S393,164.9,393,213s-18.7,93.3-52.7,127.3S261.1,393,213,393
          s-93.3-18.7-127.3-52.7S33,261.1,33,213s18.7-93.3,52.7-127.3S164.9,33,213,33 M213,15C103.6,15,15,103.7,15,213s88.6,198,198,198
          s198-88.6,198-198S322.4,15,213,15L213,15z"/>
        <path fill="${this.colors.k}" d="M149.6,226.3L139,237.8V265H116V161H139v41.4l44-41.4H216l-50,47.5l50,56.5h-32.7L149.6,226.3z"/>
        <path fill="${this.colors.n}" d="M310,161v104l-69-50.7V265h-25V161l69,53.1V161H310z"/>
      </svg>
    `
    },

    draw() {
      var img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);

        this.canvas.toBlob(function(blob) {
          var newImg = document.createElement('img'),
          url = URL.createObjectURL(blob);

          // no longer need to read the blob so it's revoked
          newImg.onload = () => URL.revokeObjectURL(url);
        });
      }

      img.src = "data:image/svg+xml," + encodeURIComponent(this.getLayout());
    },

    download() {
      let image = this.canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      let link = document.createElement('a');
      link.download = "KN_logo.png";
      link.href = image;
      link.click();
    }


  },
  watch: {
    colors: {
      handler() { this.draw(); },
      deep: true
   }
  },
  mounted() {
    this.canvas = document.getElementById('logo-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
})
