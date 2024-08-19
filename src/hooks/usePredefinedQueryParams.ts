import { useContext, useEffect, useMemo } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { mainContext } from "../context";
import { RoutesPath } from "../routing/routes";

export const usePredefinedQueryParams = (): any => {
  const [searchParams] = useSearchParams();
  const { setGeneralAppParams } = useContext(mainContext);
  const navigate = useNavigate();

  useEffect(() => {
    setGeneralAppParams(searchParams.toString());
  }, [searchParams, setGeneralAppParams]);

  const predefinedParams = useMemo(() => {
    const locationId = searchParams.get("locationId");
    const locationName = searchParams.get("locationName");
    const sublocationId = searchParams.get("sublocationId");
    const sublocationName = searchParams.get("sublocationName");
    const customerId = searchParams.get("customerId");

    let result: any = null;

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

  useEffect(() => {
    if (!predefinedParams) {
      navigate(RoutesPath.ERROR);
    }
  }, [predefinedParams, navigate]);

  return {
    predefinedParams: predefinedParams,
    rawStringParams: searchParams.toString(),
  };
};
