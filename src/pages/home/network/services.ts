import { apiClient } from "../../../apiClient";
import { createIssueDataAdapter, issueTypesDataAdapter } from "./dataAdapters";
import { homePageUrls } from "./url";

export const getAllLocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { label: "Location1", value: 2324 },
        { label: "Location2", value: 9292 },
      ]);
    }, 1000);
  });
};

export const getAllSublocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { label: "Subocation1", value: 1123 },
        { label: "Sublocation2", value: 1233 },
      ]);
    }, 1000);
  });
};

export const createReportedIssue = async (
  data: any,
): Promise<{ jobId: number }> => {
  const multipartFormData = createIssueDataAdapter(data);

  console.log(multipartFormData.entries());

  const { data: response } = await apiClient.post<
    any,
    { data: { jobId: number } }
  >(homePageUrls.createIssue, multipartFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export const getIssueTypes = async () => {
  const { data } = await apiClient.get(homePageUrls.getIssueTypes);
  return issueTypesDataAdapter(data.issueTypes);
};
