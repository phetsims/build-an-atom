/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAABkCAIAAAANEJXjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+ZJREFUeNrsnc9Lk2EcwJ1Oy3Sv5lVwt3AXj+u0JFxQUEFdXesPUG9itfAkOu/Tg9BFM+xU2SEFlSDrkAmBlw1vE0e3cJszM6d99dW3bZqlqDzP3s+HB3l9Nxy+H76/3m3v60hm5ktAQ0o5BJgDzMF/4DzrF3g5NjE29s7Oh3j8bURLc0tL3z59/EqI6GfOJBgIBAOtdju4/pu3tDfndjdc8/kIFDoUwBzmoDg7lIOsJJMLCwt/e7Spqam2pkapI7XWG14fHpYNY3TE6fXa15xoO6L1mp6cUKSj2UokZG1MzZjaiDlt+Pnq9Y/IwD+ftjk353AZZZ7G4q9zElIbmdXc9WxoyHxI8qRkS1Uagfr68qteWQ7DOOJpqUBwra/PpjHXs/+fd7S3qVPkLty/J0s20g+Cvz7P0VsWMjL6Ih6PmwHX0dZGltYj5qTP7OzqMre7n4ZU6yqPqG2SJK1fJSK/X9mrc3WLMVuYiwwOirySnZNkbo0CTloSqX+WNimEznPsUJwqBFxkYHAv4EIhjfKVdJKu5yPmtkSbM+dXW9S5zq5HZsA1+3w2fD9B15iLx5dGRketCqdmMTNbyuxywprwZI9MC2bPaVNz1iQgAafm20AiqWASF3PyUypcrrlzaEkUMvdhdtYKOGsMVw1zEj+kyDV67JstV1aSZoZ0N0hT2aCmOWsSp8794e6d27LoNXTtLcEW5qSjqaiqzl2nUm4L/uaNs/zkDzFHzAHmAHOg9lSgCDJNFpx4kz2Y08Gcu0Gv9yjIltQ5wBxQ545HT/4H7oKtAWXPgGMu31xvnrlmn099c2RL6hxgDjCHOcAcYA5zgDnAHGAOc4A5wBzmAHOAOcAc5gBzgDnMAeYAc4C54kT7zzif7Ev+zT7f1OQEMQeYA8xhDuhQToPuUOgsvtO9kVkl5gBzgDnMAR3KPtlobDMa3UrsXNzaYRjlXu953pQIcydk5XqL6SyXMo+nuj+MP6Wz5UFtu1EYPeebSmHu+K9dX1/VH659P1O3GLs8/8W60LVSt5wiWx6COLO2HYZLzJm3AhCjiFG9QynZvx1mdjmxPrx3U5vKjnbEaGAu93aY0l5K/qzwtyBGs3luO5XKPH5i5kxQ3ZzkRulQZF3avbCryFvrC2+n0rjRJuYuPgxakZeNRXGjqLlsNCblLXeky02SDpeBG0U7lO10SszJKvN4Sg3XViotM7j5kOzhHIoGvaUIy+aP59X9YcSoa87p9daMv9mYnpa0KfFnOpOdFX6/TOWIUTrmJCVWkhWLY54DzGEOMAdadig9vX0FV5YHYs6mOJKZeY4CMQeYA8xhDtTitwADALZWTTjBoNW4AAAAAElFTkSuQmCC';
export default image;