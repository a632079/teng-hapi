class route {
  constructor () {
    let Controller = module.parent.require('./src/controller')
    this.controller = new Controller()
    return this.routes()
  }
  async routes () {
    let routes
    await this.controller.then((controller) => {      
      // Load RouteMap
      const RouteMap = module.parent.require('./route')
      routes = new RouteMap(controller)
    })
    return routes
  }
}
module.exports = route
