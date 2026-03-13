import type { CalculationTrace } from "./types";

/**
 * Módulo: Engine
 * Responsabilidade: Executar os cálculos estritamente conforme as fórmulas académicas fornecidas.
 * Regra: Não fazer juízo de valor, apenas matemática.
 */

// Auxiliar para criar o trace
const trace = (res: number, formula: string, vars: Record<string, string | number>): CalculationTrace => ({
    rawResult: res,
    formulaTemplate: formula,
    substitutionMap: vars
});

// 3.1 Cotação inicial (C)
// Metodologia: C = Valor nominal da ação antiga × Valor nominal da ação nova
export const calculateC = (nomOld: number, nomNew: number): CalculationTrace => {
    const result = nomOld * nomNew;
    return trace(result, "Nom_antiga * Nom_nova", { Nom_antiga: nomOld, Nom_nova: nomNew });
};

// 3.3 Número teórico de ações novas (An)
// Metodologia: An = Aa / C
export const calculateAn = (Aa: number, C: number): CalculationTrace => {
    // Evitar divisão por zero
    if (C === 0) throw new Error("Cotação Inicial (C) não pode ser zero.");
    const result = Aa / C;
    return trace(result, "Aa / C", { Aa, C });
};

// 3.4 Preço de emissão (Pe)
// Caso venha em percentagem: Pe = NomNew * percent
// Caso absoluto, retorna o próprio.
// A decisão da origem vem do Resolver, aqui calculamos.
export const calculatePe = (nomNew: number, inputVal: number, isPercentage: boolean): CalculationTrace => {
    if (isPercentage) {
        // inputVal assume-se 0-100 ou 0-1? Academicamente percentagem costuma ser dada ex: 20%.
        // O Resolver deve normalizar para decimal se for o caso, mas vamos assumir que o input
        // já venha "tratado" ou que fiz conta aqui.
        // O prompt diz: "Pe = Valor nominal da nova ação × percentagem"
        // Vamos assumir que o Resolver manda a percentagem em decimal (ex: 0.20 para 20%).
        const result = nomNew * inputVal;
        return trace(result, "Nom_nova * %", { Nom_nova: nomNew, "%": inputVal });
    }
    return trace(inputVal, "Valor absoluto", { Valor: inputVal });
};

// 3.5 Cotação ajustada (C’)
// Metodologia: C’ = [(Aa × C) + (Aa × Pe)] / (Aa + An)
// ATENÇÃO: Fórmula implementada estritamente conforme enunciado.
export const calculateCPrime = (Aa: number, C: number, Pe: number, An: number): CalculationTrace => {
    const numerator = (Aa * C) + (Aa * Pe);
    const denominator = Aa + An;
    if (denominator === 0) throw new Error("Denominador (Aa + An) é zero.");

    const result = numerator / denominator;
    return trace(result, "[(Aa * C) + (Aa * Pe)] / (Aa + An)", { Aa, C, Pe, An });
};

// 3.6 Valor teórico (VT)
// Metodologia: VT = Aa / An
export const calculateVT = (Aa: number, An: number): CalculationTrace => {
    if (An === 0) throw new Error("An (Ações novas) é zero.");
    const result = Aa / An;
    return trace(result, "Aa / An", { Aa, An });
};

// 3.7 Direito teórico (DT)
// Metodologia: DT = C’ / VT
export const calculateDT = (CPrime: number, VT: number): CalculationTrace => {
    if (VT === 0) throw new Error("VT (Valor teórico) é zero.");
    const result = CPrime / VT;
    return trace(result, "C' / VT", { "C'": CPrime, VT });
};

// 3.8 Direito de subscrição (DS)
// Metodologia: DS = (C’ − Pe) / VT
export const calculateDS = (CPrime: number, Pe: number, VT: number): CalculationTrace => {
    if (VT === 0) throw new Error("VT (Valor teórico) é zero.");
    const result = (CPrime - Pe) / VT;
    return trace(result, "(C' - Pe) / VT", { "C'": CPrime, Pe, VT });
};

// 3.9 Direito de incorporação (DI)
// Metodologia: DI = C’ / VT
// NOTA: A fórmula 3.9 é IDÊNTICA à 3.7 (DT) no prompt.
// "DI = C’ / VT" vs "DT = C’ / VT".
// Implementando estritamente como pedido.
export const calculateDI = (CPrime: number, VT: number): CalculationTrace => {
    if (VT === 0) throw new Error("VT (Valor teórico) é zero.");
    const result = CPrime / VT;
    return trace(result, "C' / VT", { "C'": CPrime, VT });
};
