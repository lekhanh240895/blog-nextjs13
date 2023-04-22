import SearchTabs from "@/app/components/SearchTabs";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchTabs />
    </Suspense>
  );
}
