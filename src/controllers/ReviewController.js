import ApiController from './ApiController';

class ReviewController extends ApiController {
  constructor() {
    super('reviews');
  }
}

export default new ReviewController();
