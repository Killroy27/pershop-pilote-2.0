"use client";

import { SettingsSidebar } from "@/components/profile/SettingsSidebar";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { MorphologyCard } from "@/components/profile/MorphologyCard";
import { Separator } from "@/components/ui/separator";

export default function ProfileSettingsPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">
            <div className="flex min-h-screen">

                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block w-72 border-r border-[#D4AF37]/20 p-8 fixed h-full bg-[#FDFBF7] dark:bg-background z-10">
                    <SettingsSidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-72 p-6 md:p-12 lg:p-20 max-w-4xl mx-auto">

                    {/* Mobile Sidebar Trigger could go here */}

                    <div className="space-y-12 animate-in fade-in duration-700">

                        <h1 className="font-serif text-4xl font-bold text-center lg:text-left">Mon profil</h1>

                        <div className="flex flex-col items-center py-6">
                            <p className="text-lg font-medium mb-6">Photo de profil</p>
                            <ProfileAvatar />
                        </div>

                        <ProfileForm />

                        <Separator className="bg-[#D4AF37]/20" />

                        <MorphologyCard />
                    </div>

                </div>
            </div>
        </div>
    );
}
