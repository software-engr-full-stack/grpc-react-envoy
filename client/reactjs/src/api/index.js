import humps from 'humps';

import { MainServiceRequest } from '../proto/grpcapp_pb';
import { MainServicePromiseClient } from '../proto/grpcapp_grpc_web_pb';

import {
  persist,
  hydrate,
  persistClear,
  presentInSaved,
  savedDataList
} from './persist';

const retrieve = (zipCode) => {
  if (presentInSaved(zipCode)) return Promise.resolve(presentInSaved(zipCode));

  // TODO: IMPORTANT, in .env... file
  //   REACT_APP_API_END_POINT=http://localhost:8080/ (with slash at the end) does not work
  //   Careful when entering production endpoint.
  const svc = new MainServicePromiseClient(process.env.REACT_APP_API_END_POINT);
  const request = new MainServiceRequest();

  request.setZipcode(zipCode);

  return svc.run(request, {}).then(
    (response) => {
      const { result } = humps.camelizeKeys(JSON.parse(response.getResponse()));
      if (!result) {
        return { apiError: '... blank result' };
      }

      const { zipCodeData } = result;
      const zcode = zipCodeData.postCode.trim();

      const blob = {
        ...result,
        location: { ...zipCodeData.places[0], zipCode: zcode }
      };

      persist(blob);

      return blob;
    }
  ).catch((error) => ({ apiError: error.message }));
};

export {
  retrieve,
  hydrate,
  persist,
  persistClear,
  savedDataList
};
