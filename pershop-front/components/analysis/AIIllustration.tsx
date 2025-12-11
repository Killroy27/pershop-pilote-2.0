"use client";

import { useTheme } from "next-themes";

export function AIIllustration() {
    const { theme } = useTheme();

    // This is a placeholder for the complex SVG illustration in the mockup
    // We'll use a stylized structure that looks good
    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square flex flex-col items-center justify-center">
            <div className="relative w-[80%] h-[80%] drop-shadow-2xl">
                {/* Using standard img for simplicity with local file, could use next/image if configured */}
                <img
                    src="/ai-analysis-face.png"
                    alt="IA Styliste"
                    className="w-full h-full object-contain dark:opacity-90 mix-blend-multiply dark:mix-blend-normal"
                />
            </div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-foreground font-medium">
                    Notre IA analyse votre photo pour <br />
                    vous proposer des tenues <br />
                    personnalisées. Tout est sécurisé.
                </p>
            </div>
        </div>
    );
}
