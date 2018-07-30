// Vuex
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    colors: {
      b: '#FFFFFF', // background
      k: '#345171', // letter K
      n: '#4A79A5', // letter N
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
})

Vue.component('color-input', {
  props: ['name', 'title', 'placeholder'],
  data: function () {
    return {
      value: '',
      pickedValue: this.placeholder,
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
                  <input tabindex="-1" type="color" @input="onPick" v-model="pickedValue">
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
    },

    onPick() {
      this.value = this.pickedValue;
    },

    clear() {
      this.value = '';
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


// Vue App
var app = new Vue({
  el: '#logo-generator-app',
  data: {
    canvas: undefined,
    ctx: undefined,
    variation: 'outlined'
  },
  computed: {
    colors() {
      return store.getters.colors;
    },
  },

  methods: {
    getLayout() {
      return `
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 426 426" style="enable-background:new 0 0 426 426;" xml:space="preserve">
        <circle fill="#FFFFFF" cx="213" cy="213" r="213"/>
        <circle fill="${this.colors.b}" cx="213" cy="213" r="183"/>
        <path fill="${this.variation ==='filled' ? this.colors.b : this.colors.n}" d="M213,40c46.2,0,89.7,18,122.3,50.7S386,166.8,386,213c0,46.2-18,89.7-50.7,122.3S259.2,386,213,386
          s-89.7-18-122.3-50.7S40,259.2,40,213s18-89.7,50.7-122.3S166.8,40,213,40 M213,20C106.4,20,20,106.4,20,213s86.4,193,193,193
          s193-86.4,193-193S319.6,20,213,20L213,20z"/>
        <path fill="${this.colors.k}" d="M149.6,226.3L139,237.8V265h-23V161h23v41.4l44-41.4h33l-50,47.5l50,56.5h-32.7L149.6,226.3z"/>
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
          newImg.onload = () => URL.revokeObjectURL(url); // no longer need to read the blob so it's revoked
        });
      }

      img.src = "data:image/svg+xml," + encodeURIComponent(this.getLayout());
    },

    download() {
      let image = this.canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
      let link = document.createElement('a');
      link.download = "KN.png";
      link.href = image;
      link.click();
    },

    clearInputs() {
      for (let key in this.$refs) {
        if (this.$refs.hasOwnProperty(key) &&  key.toString().indexOf('input-color-') === 0) {
          if (this.$refs[key]) this.$refs[key].clear();
        }
      }
    }
  },
  watch: {
    colors: {
      handler() { this.draw(); },
      deep: true
    },

    variation() {
      this.clearInputs();

      if (this.variation === 'outlined') {
        store.commit('updateColor', {color: 'o', value: '#4A79A5' });
        store.commit('updateColor', {color: 'b', value: '#FFFFFF' });
        store.commit('updateColor', {color: 'k', value: '#345171' });
        store.commit('updateColor', {color: 'n', value: '#4A79A5' });
      } else {
        store.commit('updateColor', {color: 'o', value: '#DA272D' });
        store.commit('updateColor', {color: 'b', value: '#DA272D' });
        store.commit('updateColor', {color: 'k', value: '#FFFFFF' });
        store.commit('updateColor', {color: 'n', value: '#FFFFFF' });
      }
    }
  },
  mounted() {
    this.canvas = document.getElementById('logo-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }
})
