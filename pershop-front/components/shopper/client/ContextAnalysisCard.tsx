"use client";

export function ContextAnalysisCard() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#D4AF37] font-bold text-lg font-serif">
                    Contexte Situationnel (Context Genius)
                </h2>
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Urgent - 8/10
                </span>
            </div>

            {/* Timeline */}
            <div className="relative py-8 mb-6">
                {/* Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

                <div className="flex justify-between w-full max-w-2xl mx-auto">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-xs">Aujourd&apos;hui</span>
                        <div className="h-4 w-4 bg-[#D4AF37] rounded-full ring-4 ring-white"></div>
                        <span className="text-xs text-gray-500 text-center">Brief Client</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-2 mt-8">
                        <span className="font-bold text-xs">Dans 3 jours</span>
                        <div className="h-4 w-4 bg-[#FCCA2E] rounded-full ring-4 ring-white"></div>
                        <span className="text-xs text-gray-500 text-center">Présentation Comité</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-xs">Dans 1 semaine</span>
                        <div className="h-4 w-4 bg-[#E5E5E5] rounded-full ring-4 ring-white"></div>
                        <span className="text-xs text-gray-500 text-center">Lancement Projet</span>
                    </div>
                </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed max-w-4xl">
                Le client est sous pression pour un lancement imminent. La présentation au comité est cruciale pour l&apos;approbation du budget. Les enjeux financiers sont élevés, et le client craint des questions difficiles sur la viabilité du projet. Une approche rassurante et factuelle est recommandée.
            </p>
        </div>
    );
}
