
import type { PedagogicalStep } from "@/core/types";
import { StepCard } from "./StepCard";

interface Props {
    steps: PedagogicalStep[];
}

export const ResultsDisplay = ({ steps }: Props) => {
    if (steps.length === 0) return null;

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Resolução Passo a Passo</h2>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">
                    {steps.length} Passos
                </span>
            </div>

            <div className="grid gap-6">
                {steps.map((step) => (
                    <StepCard key={step.stepNumber} step={step} />
                ))}
            </div>
        </div>
    );
};
