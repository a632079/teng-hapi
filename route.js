class routes {
  constructor (controller) {
    this.route = []
    return this.routeMap(controller)
  }
  routeMap (controller) {
    // Add a route
    this.route.push({
      method: 'GET',
      path: '/',
      handler: controller.hello.index
    })
    // console.log(this.route)
    return this.route
  }
}

module.exports = routes
