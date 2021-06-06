import ApiController from './ApiController';

class ReviewController extends ApiController {
  constructor() {
    super('restaurants');
  }
}

export default new ReviewController();
