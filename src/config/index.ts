import devConf from './dev';
import prodConf from './prod';

export default process.env.NODE_ENV === 'production' ? prodConf : devConf;
