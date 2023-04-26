import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-900 min-h-screen grid grid-cols-4">
      <div className="h-full text-white">
        <Sidebar />
      </div>

      <div className="bg-white m-4 ml-0 col-span-3 rounded-md p-4">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
