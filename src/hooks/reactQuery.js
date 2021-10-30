import { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { message } from 'antd';

const useDisplayError = (shouldDisplayError, error, prefixErrorMessage) => {
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  if (!isErrorDisplayed && shouldDisplayError && !!error) {
    setIsErrorDisplayed(true);
    console.error(error); /* eslint no-console: ["error", { allow: ["error"] }] */

    const baseErrorMessage = error.message || 'Something went wrong while retriving data, please contact our technical support';
    const errorMessage = `${prefixErrorMessage}${baseErrorMessage}`;
    message.error(errorMessage);
  }
};

export const useRefetchQuery = keys => {
  const queryClient = useQueryClient();
  const refetch = useCallback(
    (extraKeys = []) => {
      queryClient.invalidateQueries([...keys, ...extraKeys]);
    },
    [queryClient, keys]
  );

  return { refetch };
};

export const useCustomQuery = (
  key,
  paramsInArray = [],
  apiFunction,
  {
    shouldDisplayError = true,
    defaultEmptyValue = undefined,
    prefixErrorMessage = '',
    throttleRefetchTimeInMs = 0,
    postProcessFunc = apiResData => apiResData,
    ...queryOptions
  } = {}
) => {
  const keysInQuery = useMemo(() => [key, ...paramsInArray], [key, paramsInArray]);
  const wrappedApiFunc = useCallback(async () => {
    return apiFunction(...keysInQuery).then(postProcessFunc);
  }, [apiFunction, keysInQuery, postProcessFunc]);

  const {
    data,
    isFetching, // isFetching is the loading state that we always expected
    isLoading, // We deconstruct isLoading to prevent overriding our custom field when return
    error,
    refetch,
    ...returnedParams
  } = useQuery(keysInQuery, wrappedApiFunc, queryOptions);

  useDisplayError(shouldDisplayError, error, prefixErrorMessage);
  const returnedData = useMemo(() => data || defaultEmptyValue, [defaultEmptyValue, data]);

  // isFetching is alaways true even when it is not fetching.
  return { isLoading: isFetching, data: returnedData, error, refetch, ...returnedParams };
};
