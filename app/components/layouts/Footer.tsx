interface FooterProps {
  year: number;
}

export function Footer(props: FooterProps) {
  const { year } = props;

  return (
    <footer className="footer flex  items-center justify-center p-4 bg-san-juan text-quicksand ">
      <p className="text-sm lg:text-lg">
        {`© ${year} Pattadon Sa-ngasri - All right
          reserved`}
      </p>
    </footer>
  );
}
