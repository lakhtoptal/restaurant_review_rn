import ApiController from './ApiController';

class ReviewController extends ApiController {
  constructor() {
    super('comments');
  }
}

export default new ReviewController();
