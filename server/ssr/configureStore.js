import configureStore from '../../client/configureStore';

export default async (req, res) => {
  try {
    const store = configureStore();
    return store;
  } catch (e) {
    res.status(500).send('Internal Error');
    return false;
  }
};
