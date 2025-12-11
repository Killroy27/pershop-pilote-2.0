"use client";

export function RecommendationsCard() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 h-full">
            <h2 className="text-[#D4AF37] font-bold text-lg mb-6 leading-tight font-serif">
                Synthèse & Recommandations (Strategic Advisor)
            </h2>

            <ul className="space-y-6 text-sm">
                <li className="flex gap-3">
                    <span className="h-2 w-2 mt-1.5 rounded-full bg-black shrink-0"></span>
                    <p className="text-gray-700">
                        <span className="font-bold text-[#111111]">Stratégie:</span> Se concentrer sur la preuve de la valeur et la solidité du plan.
                    </p>
                </li>
                <li className="flex gap-3">
                    <span className="h-2 w-2 mt-1.5 rounded-full bg-black shrink-0"></span>
                    <p className="text-gray-700">
                        <span className="font-bold text-[#111111]">Focus:</span> Mettre en avant les éléments tangibles et les résultats prévus pour rassurer sur la viabilité.
                    </p>
                </li>
                <li className="flex gap-3">
                    <span className="h-2 w-2 mt-1.5 rounded-full bg-black shrink-0"></span>
                    <p className="text-gray-700">
                        <span className="font-bold text-[#111111]">Key Question:</span> "Quels sont les points spécifiques qui suscitent le plus d&apos;inquiétude lors de la présentation ?"
                    </p>
                </li>
                <li className="flex gap-3">
                    <span className="h-2 w-2 mt-1.5 rounded-full bg-black shrink-0"></span>
                    <p className="text-gray-700">
                        <span className="font-bold text-[#111111]">Action Recommended:</span> Préparer des données chiffrées et des études de cas pertinentes pour étayer les arguments.
                    </p>
                </li>
            </ul>
        </div>
    );
}
