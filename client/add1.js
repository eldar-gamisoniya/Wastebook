import { add, compose } from 'ramda';
import addCommon from './addCommon';

const add1 = compose(addCommon, add(1));
export { add1 as add };
