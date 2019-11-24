import { getComcode } from '@/utils/auth'
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  name: state => state.user.name,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  menus: state => state.user.menus,
  infoTimes: state => state.user.infoTimes,
  comcode: state => {
    let comcode = state.user.comcode
    console.log(comcode, 'comcode')
    if (!comcode) {
      comcode = getComcode()
    }
    return comcode
  }
}
export default getters
