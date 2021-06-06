import ApiController from './ApiController';

class RestaurantController extends ApiController {
  constructor() {
    super('restaurants');
  }
}

export default new RestaurantController();
