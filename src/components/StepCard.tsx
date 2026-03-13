import type { PedagogicalStep } from "@/core/types";

// Helper de formatação
const formatValue = (stepNumber: string, val: number) => {
    // Passos monetários em EUR, outros em número simples
    // 3.1 C (Money)
    // 3.3 An (Number)
    // 3.4 Pe (Money)
    // 3.5 C' (Money)
    // 3.6 VT (Money)
    // 3.7 DT (Money)
    // 3.8 DS (Money)
    // 3.9 DI (Money)
    const moneySteps = ["3.1", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9"];
    if (moneySteps.includes(stepNumber)) {
        return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val);
    }
    return new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 4 }).format(val);
};

export const StepCard = ({ step }: { step: PedagogicalStep }) => (
    <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-lg text-slate-800 flex items-center">
                <span className="bg-indigo-100 px-2 py-0.5 rounded text-indigo-700 mr-3 text-sm font-mono border border-indigo-200">
                    {step.stepNumber}
                </span>
                {step.title}
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-md font-mono text-sm text-slate-700 space-y-3 border border-slate-200">
                <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Fórmula</div>
                    <div className="font-semibold text-slate-800">{step.formula}</div>
                </div>
                <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Substituição</div>
                    <div className="break-all text-slate-600">{step.substitution}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-indigo-50 p-4 rounded-md text-indigo-900 border border-indigo-100">
                <div className="text-xs uppercase tracking-wider mb-1 text-indigo-400">Resultado</div>
                <div className="text-3xl font-bold tracking-tight">
                    {formatValue(step.stepNumber, step.result)}
                </div>
            </div>
        </div>

        <div className="pt-2 text-sm text-slate-600 space-y-3">
            <p>
                <span className="font-semibold text-slate-800">Explicação: </span>
                {step.explanation}
            </p>

            {step.interpretation && (
                <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-md border text-yellow-800 border-yellow-200">
                    <span className="text-lg">💡</span>
                    <p className="italic">
                        <span className="font-semibold not-italic text-yellow-900">Nota do Professor:</span> {step.interpretation}
                    </p>
                </div>
            )}
        </div>
    </div>
);
