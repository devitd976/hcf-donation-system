
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`${isMobile ? '' : 'md:ml-64'}`}>
        <Header />
        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
