import humps from 'humps';

import { MainServiceRequest } from '../proto/grpcapp_pb';
import { MainServicePromiseClient } from '../proto/grpcapp_grpc_web_pb';

import {
  persist,
  hydrate,
  persistClear,
  presentInSaved,
  savedDataList,
  noSavedData
} from './persist';

const defaultZipCode = '57717';
const retrieve = (zipCode) => {
  if (presentInSaved(zipCode)) return Promise.resolve(presentInSaved(zipCode));

  const svc = new MainServicePromiseClient('/api');
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
        location: {
          ...zipCodeData.places[0],
          zipCode: zcode,
          default: zcode === defaultZipCode
        }
      };

      persist(zcode, blob);

      return blob;
    }
  ).catch((error) => ({ apiError: error.message }));
};

const defaultLocation = () => retrieve(defaultZipCode);

export {
  defaultZipCode,
  defaultLocation,
  retrieve,
  hydrate,
  persist,
  persistClear,
  savedDataList,
  noSavedData
};
