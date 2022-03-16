import humps from 'humps';

import { TestRequest } from '../proto/grpcapp_pb';
import { TestPromiseClient } from '../proto/grpcapp_grpc_web_pb';

const data = () => {
  // TODO: IMPORTANT, in .env... file
  //   REACT_APP_API_END_POINT=http://localhost:8080/ (with slash at the end) does not work
  //   Careful when entering production endpoint.
  const testService = new TestPromiseClient(process.env.REACT_APP_API_END_POINT);
  const request = new TestRequest();

  request.setName('TEST FROM JAVASCRIPT!');

  return testService.test(request, {}).then(
    (response) => humps.camelizeKeys(JSON.parse(response.getMessage()))
  );
};

export default data;
