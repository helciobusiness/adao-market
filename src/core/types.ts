export interface InputData {
    nomOld: number; // Valor nominal da ação antiga
    nomNew: number; // Valor nominal da ação nova
    capitalBefore: number; // Aa: Capital social antes do aumento
    emissionPriceRaw: number; // Valor bruto inserido para Pe
    isPercentage: boolean; // Se o valor de Pe é uma percentagem (0-100)
}

export interface CalculationTrace {
    rawResult: number;
    formulaTemplate: string;
    substitutionMap: Record<string, string | number>;
}

export interface AcademicResult {
    C: CalculationTrace;     // 3.1 Cotação inicial
    An: CalculationTrace;    // 3.3 Número teórico de ações novas
    Pe: CalculationTrace;    // 3.4 Preço de emissão
    CPrime: CalculationTrace;// 3.5 Cotação ajustada
    VT: CalculationTrace;    // 3.6 Valor teórico
    DT: CalculationTrace;    // 3.7 Direito teórico
    DS: CalculationTrace;    // 3.8 Direito de subscrição
    DI: CalculationTrace;    // 3.9 Direito de incorporação
}

export interface PedagogicalStep {
    stepNumber: string; // "3.1", "3.2"
    title: string;
    formula: string;
    substitution: string;
    result: number;
    explanation: string;
    interpretation?: string;
}
