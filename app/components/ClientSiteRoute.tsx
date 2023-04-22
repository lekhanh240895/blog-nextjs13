import Link from "next/link";

function ClientSiteRoute({
  children,
  route,
  className,
}: {
  children: React.ReactNode;
  route: string;
  className?: string;
}) {
  return (
    <Link href={route} className={className}>
      {children}
    </Link>
  );
}

export default ClientSiteRoute;
