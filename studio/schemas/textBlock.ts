export default {
  type: "object",
  title: "Text block",
  name: "textblock",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Content",
      name: "content",
      type: "text",
      vaLidation: (Rule) => Rule.required(),
    },
  ],
};
