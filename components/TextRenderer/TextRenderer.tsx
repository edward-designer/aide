const TextRenderer = ({ url }: { url: string }) => {
  return (
    <iframe
      title="preview of the Text document"
      src={url}
      className="w-full h-full"
    />
  );
};

export default TextRenderer;
