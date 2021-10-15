import app from '../index';
import config from '../config';

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
