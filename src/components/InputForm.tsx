
import type { InputData } from "@/core/types";
import { Info, Calculator } from "lucide-react";

interface Props {
    data: InputData;
    onChange: (data: InputData) => void;
    onCalculate: () => void;
}

export const InputForm = ({ data, onChange, onCalculate }: Props) => {
    const handleChange = (field: keyof InputData, value: string | boolean) => {
        if (typeof value === "boolean") {
            onChange({ ...data, [field]: value });
        } else {
            // Allow empty string for UX, convert to 0 on logic if needed, 
            // but here we store as number in parent, so we parse.
            // Better UX: parent holds "string" state? 
            // Simpler: parseFloat or 0.
            const num = parseFloat(value) || 0;
            onChange({ ...data, [field]: num });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Calculator size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Dados do Exercício</h2>
                    <p className="text-slate-500 text-sm">Preencha com os valores do enunciado</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nominal Antiga */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                        Valor Nominal Ação Antiga
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">€</span>
                        <input
                            type="number"
                            className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: 5.00"
                            value={data.nomOld || ""}
                            onChange={(e) => handleChange("nomOld", e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-slate-400">Valor facial do título pré-aumento.</p>
                </div>

                {/* Nominal Nova */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                        Valor Nominal Ação Nova
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">€</span>
                        <input
                            type="number"
                            className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: 5.00"
                            value={data.nomNew || ""}
                            onChange={(e) => handleChange("nomNew", e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-slate-400">Valor facial do novo título.</p>
                </div>

                {/* Aa (Capital) */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                        Capital Social Antes (Aa)
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">€</span>
                        <input
                            type="number"
                            className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: 500000"
                            value={data.capitalBefore || ""}
                            onChange={(e) => handleChange("capitalBefore", e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-slate-400">Montante total do Capital Social antes da operação.</p>
                </div>

                {/* Pe */}
                <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            Preço de Emissão (Pe)
                        </label>
                        <div className="flex items-center gap-2 text-sm bg-slate-50 px-2 py-1 rounded border">
                            <input
                                type="checkbox"
                                id="isPercent"
                                checked={data.isPercentage}
                                onChange={(e) => handleChange("isPercentage", e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="isPercent" className="cursor-pointer text-slate-600 select-none">
                                É percentagem (%)?
                            </label>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">
                            {data.isPercentage ? "%" : "Kz"}
                        </span>
                        <input
                            type="number"
                            className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder={data.isPercentage ? "Ex: 20" : "Ex: 6.00"}
                            value={data.emissionPriceRaw || ""}
                            onChange={(e) => handleChange("emissionPriceRaw", e.target.value)}
                        />
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1">
                        <Info size={12} className="mt-0.5" />
                        <span>
                            {data.isPercentage
                                ? "O valor será aplicado sobre o Nominal da Ação Nova."
                                : "Valor monetário a pagar por cada nova ação."}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-end">
                <button
                    onClick={onCalculate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                    <Calculator size={18} />
                    Calcular Agora
                </button>
            </div>
        </div>
    );
};
