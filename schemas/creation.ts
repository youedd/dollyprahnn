export default {
  title: "Creation",
  name: "creation",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      title: "Blocks",
      name: "blocks",
      type: "array",
      of: [{ type:"textblock" }],
    },
  ],
};
