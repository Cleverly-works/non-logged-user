export const issueTypesDataAdapter = (issueTypes: any[]) => {
  return issueTypes.map((issueType) => ({ ...issueType, ...issueType.meta }));
};

export const createIssueDataAdapter = (data: any) => {
  const form = new FormData();

  console.log(data.attachments);

  data?.attachments?.forEach(({ media }: { media: File }) => {
    console.log(media);
    form.append(`attachments`, media);
  });

  form.set("email", data.email);
  form.set("name", data.name);
  form.set("phone", data.phone);
  form.set("issueType", data.issueType.id);
  form.set("location", data.location.value);
  form.set("customerId", data.customerId);
  form.set("sublocation", data.sublocation?.value ?? null);
  form.set("description", data.description);
  form.set("shouldSendNotifications", data.shouldSendNotifications);

  return form;
};
