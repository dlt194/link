import UrlShortener from "./components/UrlShortener";
import UrlList from "@/components/UrlList";

export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-100 border-r p-4 overflow-y-auto">
        <UrlList />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <UrlShortener />
      </main>
    </div>
  );
}
