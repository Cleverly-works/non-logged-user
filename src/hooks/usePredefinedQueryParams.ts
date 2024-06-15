import { useMemo } from "react";

import { useSearchParams } from "react-router-dom";

type UsePredefinedQueryParamsReturnType = {
  location: {
    id: number;
    name: string;
    locationForSelect: {
      label: string;
      value: number;
    };
  };
  sublocation?: {
    id: number;
    name: string;
    sublocationForSelect: {
      label: string;
      value: number;
    };
  };
  customer: {
    id: number;
  };
};

export const usePredefinedQueryParams =
  (): UsePredefinedQueryParamsReturnType | null => {
    const [searchParams] = useSearchParams();

    const predefinedParams = useMemo(() => {
      const locationId = searchParams.get("locationId");
      const locationName = searchParams.get("locationName");
      const sublocationId = searchParams.get("sublocationId");
      const sublocationName = searchParams.get("sublocationName");
      const customerId = searchParams.get("customerId");

      let result: UsePredefinedQueryParamsReturnType | null = null;

      if (locationId && locationName && customerId) {
        result = {
          location: {
            id: +locationId,
            name: locationName,
            locationForSelect: {
              label: locationName,
              value: +locationId,
            },
          },
          customer: {
            id: +customerId,
          },
        };

        if (sublocationId && sublocationName) {
          result = {
            ...result,
            sublocation: {
              id: +sublocationId,
              name: sublocationName,
              sublocationForSelect: {
                label: sublocationName,
                value: +sublocationId,
              },
            },
          };
        }
      }

      return result;
    }, [searchParams]);

    return predefinedParams;
  };
