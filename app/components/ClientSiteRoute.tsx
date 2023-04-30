import Link from "next/link";

function ClientSiteRoute({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  return <Link href={route}>{children}</Link>;
}

export default ClientSiteRoute;
