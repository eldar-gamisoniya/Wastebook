import { add, pipe } from 'ramda';
import addCommon from './addCommon';

const add2 = pipe(addCommon, add(2));
export { add2 as add };
