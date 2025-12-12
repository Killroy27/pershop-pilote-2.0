import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">

            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors gap-2 text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Retour</span>
                    </Link>

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-65px)] p-6">
                <div className="w-full max-w-md animate-in zoom-in-95 duration-500 fade-in">
                    <AuthForm />
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-muted-foreground bg-[#FDFBF7] dark:bg-background border-t border-border">
                &copy; {new Date().getFullYear()} Pershop Pilot. Tous droits réservés.
            </div>
        </div>
    );
}
