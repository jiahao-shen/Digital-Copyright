const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar,
  info: state => state.user.info
}
export default getters