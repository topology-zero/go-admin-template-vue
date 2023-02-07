
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    authKey: state => state.user.authKey,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    userRouter: state => state.user.userRouter,
    currentRouter: state => state.routerSet.currentRouter
}
export default getters
