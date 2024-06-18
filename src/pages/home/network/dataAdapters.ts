export const issueTypesDataAdapter = (issueTypes: any[]) => {
  return issueTypes.map((issueType) => ({ ...issueType, ...issueType.meta }));
};

export const createIssueDataAdapter = (data: any) => {
  const form = new FormData();
  data?.attachments?.forEach(({ media }: any, ndx: number) => {
    form.append(`file${ndx}`, media);
  });

  form.append("email", data.email);
  form.append("name", data.name);
  form.append("phone", data.phone);
  form.append("issueType", data.issueType.id);
  form.append("location", data.location.value);
  form.append("customerId", data.customerId);
  form.append("sublocation", data.sublocation?.value ?? null);
  form.append("description", data.description);
  form.append("shouldSendNotifications", data.shouldSendNotifications);

  return form;
};
