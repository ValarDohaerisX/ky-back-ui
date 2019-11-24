import Cookies from 'js-cookie'

/**
 * 之所以定义mutationsType，是为了mutations和actions使用统一的方法名称
 * @type {Object}
 */
const mutationsType = {
  toggleSidebar: 'toggleSidebar',
  closeSidebar: 'closeSidebar',
  toggleDevice: 'toggleDevice',
  toggleDisplayMode: 'toggleDisplayMode',
  toggleDisplayStyle: 'toggleDisplayStyle'
}

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    displayMode: 'normal', // 新单录入页，带影像录入时，显示模式的切换，用于控制左侧列表和头部, normal,代表非全屏显示，fullScreen:全屏显示
    displayStyle: 'normal' // 新单录入页，带影像录入时，左右显示，上下显示的切换；normal，代表上下显示，leftAndRight：左右显示
  },
  mutations: {
    [mutationsType.toggleSidebar]: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    [mutationsType.closeSidebar]: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [mutationsType.toggleDevice]: (state, device) => {
      state.device = device
    },
    [mutationsType.toggleDisplayMode]: (state, displayMode) => {
      state.displayMode = displayMode
    },
    [mutationsType.toggleDisplayStyle]: (state, displayStyle) => {
      state.displayStyle = displayStyle
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit(mutationsType.toggleSidebar)
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit(mutationsType.closeSidebar, withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit(mutationsType.toggleDevice, device)
    },
    ToggleDisplayMode({ commit }, displayMode) {
      commit(mutationsType.toggleDisplayMode, displayMode)
    },
    ToggleDisplayStyle({ commit }, displayStyle) {
      commit(mutationsType.toggleDisplayStyle, displayStyle)
    }
  }
}

export default app
