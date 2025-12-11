import { Header } from "@/components/layout/Header";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Header />
            <main className="relative flex min-h-[calc(100vh-4rem)] flex-col">
                {children}
            </main>
        </div>
    );
}
