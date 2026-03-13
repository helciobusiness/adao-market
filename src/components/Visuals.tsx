
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import type { AcademicResult } from "@/core/types";

interface Props {
    data: AcademicResult;
}

export const Visuals = ({ data }: Props) => {
    // Chart 1: Comparison of Quotations
    // C (Initial) vs C' (Adjusted) to show dilution/impact.
    const quotationData = [
        { name: "Cotação Inicial (C)", value: data.C.rawResult },
        { name: "Cotação Ajustada (C')", value: data.CPrime.rawResult },
        { name: "Valor Teórico (VT)", value: data.VT.rawResult }, // Usually similar to C'/VT context
    ];

    // Chart 2: Rights Values
    // DT vs DS vs DI (if different, usually DI=DT in this method)
    const rightsData = [
        { name: "DT", value: data.DT.rawResult, fullName: "Direito Teórico" },
        { name: "DS", value: data.DS.rawResult, fullName: "Direito Subscrição" },
        { name: "DI", value: data.DI.rawResult, fullName: "Direito Incorporação" },
    ];

    const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-700 delay-200">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Impacto no Valor da Ação</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={quotationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                            <YAxis tickFormatter={(val) => `Kz ${val}`} />
                            <Tooltip formatter={(val: any) => `Kz ${Number(val).toFixed(2)}`} />
                            <Legend />
                            <Bar dataKey="value" name="Valor (Kz)" radius={[4, 4, 0, 0]}>
                                {quotationData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-slate-500 mt-2">
                    Comparação entre a cotação antes e depois do aumento.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Valor dos Direitos</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={rightsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(val) => `Kz ${val}`} />
                            <Tooltip
                                formatter={(val: any) => `Kz ${Number(val).toFixed(2)}`}
                                labelFormatter={(label) => {
                                    const found = rightsData.find(d => d.name === label);
                                    return found ? found.fullName : label;
                                }}
                            />
                            <Legend />
                            <Bar dataKey="value" name="Valor (Kz)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-slate-500 mt-2">
                    Valor financeiro atribuído a cada direito.
                </p>
            </div>
        </div>
    );
};
