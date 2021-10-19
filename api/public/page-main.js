window.Vue.component('page-main', {
  props: {
    userMap: Object,
    localUsers: Object,
    bounds: Object,
    showColorPicker: Boolean
  },
  computed: {
    localUserIds () {
      return Object.values(this.localUsers).map((user) => { return user.id })
    },
    viewBox () {
      return [
        0,
        0,
        this.bounds.width,
        this.bounds.height
      ].join(' ')
    }
  },
  methods: {
    isLocalUser (ship) {
      return this.localUserIds.includes(ship.id)
    }
  },
  template: `
    <svg
      class="main-view"
      :viewBox="viewBox"
    >
      <shape-defs></shape-defs>
      <defs>
        <rect
          id="bounding-rect"
          :width="bounds.width"
          :height="bounds.height"
        />
        <clipPath id="bounding-rect-mask">
          <use
            stroke="none"
            fill="#fff"
            xlink:href="#bounding-rect"
          />
        </clipPath>
      </defs>
      <g
        clip-path="url(#bounding-rect-mask)"
      >
        <g
          class="cursors"
          :transform="'scale('+bounds.width+')'"
        >
          <avatar-goose
            v-for="user in userMap"
            :user="user"
            :isLocalUser="isLocalUser(user)"
            :key="user.id"
          ></avatar-goose>
        </g>
      </g>
      <use
        xlink:href="#bounding-rect"
        fill="none"
        stroke-width="2"
        stroke="#fff"
      />
    </svg>
  `
})
