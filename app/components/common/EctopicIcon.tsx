interface EctopicIconProp {
  width?: string;
  height?: string;
}

export function EctopicIcon(props: EctopicIconProp) {
  const { width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M90 0L167.942 135H12.0577L90 0Z" fill="#69AAAC" />
      <path
        d="M89.9993 135L47.6878 70.5682L132.311 70.5682L89.9993 135Z"
        fill="#233B4D"
      />
    </svg>
  );
}
