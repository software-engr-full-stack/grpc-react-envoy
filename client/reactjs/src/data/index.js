import humps from 'humps';

import { MainServiceRequest } from '../proto/grpcapp_pb';
import { MainServicePromiseClient } from '../proto/grpcapp_grpc_web_pb';

const data = () => {
  // TODO: IMPORTANT, in .env... file
  //   REACT_APP_API_END_POINT=http://localhost:8080/ (with slash at the end) does not work
  //   Careful when entering production endpoint.
  const svc = new MainServicePromiseClient(process.env.REACT_APP_API_END_POINT);
  const request = new MainServiceRequest();

  request.setZipcode('92602');

  return svc.run(request, {}).then(
    (response) => humps.camelizeKeys(JSON.parse(response.getResponse()))
  );
};

export default data;
