const WordRenderer = ({ url }: { url: string }) => {
  return (
    <iframe
      title="preview of the Word document"
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
      )}`}
      className="w-full h-full"
    />
  );
};

export default WordRenderer;
