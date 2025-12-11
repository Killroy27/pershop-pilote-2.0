import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-[#F8F9FA] overflow-hidden">

            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-[#D4AF37]/5 pointer-events-none" />

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-10">
                <Link href="/" className="flex items-center text-gray-500 hover:text-[#111111] transition-colors gap-2 text-sm font-medium uppercase tracking-wider">
                    <ArrowLeft className="h-4 w-4" /> Retour
                </Link>
            </div>

            {/* Logo */}
            <div className="absolute top-8 right-8 z-10">
                <span className="font-serif text-2xl font-bold tracking-widest text-[#D4AF37]">PERSHOP</span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-4 w-full flex justify-center animate-in zoom-in-95 duration-500 fade-in">
                <AuthForm />
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 w-full text-center text-xs text-gray-400 font-light">
                &copy; {new Date().getFullYear()} Pershop Pilot. Tous droits réservés.
            </div>
        </div>
    );
}
