import { ShopperSidebar } from "@/components/shopper/ShopperSidebar";

export default function ShopperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F8F9FA]">
            {/* Sticky Sidebar */}
            <div className="sticky top-0 h-screen shrink-0">
                <ShopperSidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
