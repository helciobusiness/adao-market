import type { AcademicResult, PedagogicalStep } from "./types";

/**
 * Módulo: Pedagogy
 * Responsabilidade: Traduzir os resultados matemáticos em linguagem académica (Português de Portugal).
 * Segue o estilo "Professor Universitário".
 */

const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(val);

const formatNumber = (val: number) =>
    new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 4 }).format(val);

export const generatePedagogicalSteps = (result: AcademicResult): PedagogicalStep[] => {
    return [
        {
            stepNumber: "3.1",
            title: "Cotação Inicial (C)",
            formula: "C = Nom_antiga × Nom_nova",
            substitution: `C = ${result.C.substitutionMap.Nom_antiga} × ${result.C.substitutionMap.Nom_nova}`,
            result: result.C.rawResult,
            explanation: "A cotação é definida academicamente como o produto dos valores nominais.",
            interpretation: "Este valor serve de base para o cálculo do ajustamento, representando a 'força' teórica combinada dos nominais."
        },
        {
            stepNumber: "3.3",
            title: "Número Teórico de Ações Novas (An)",
            formula: "An = Aa / C",
            substitution: `An = ${formatCurrency(Number(result.An.substitutionMap.Aa))} / ${formatNumber(Number(result.An.substitutionMap.C))}`,
            result: result.An.rawResult,
            explanation: "Calculamos quantas novas ações teóricas cabem no capital antigo, dado a cotação inicial definida.",
            interpretation: "Representa a proporção de entrada de novos títulos sem considerar ainda o preço de emissão."
        },
        {
            stepNumber: "3.4",
            title: "Preço de Emissão (Pe)",
            formula: result.Pe.formulaTemplate,
            substitution: `Pe = ${result.Pe.substitutionMap.Nom_nova} × ${result.Pe.substitutionMap["%"] || result.Pe.substitutionMap.Valor}`,
            result: result.Pe.rawResult,
            explanation: "Valor a pagar por cada nova ação subscrita.",
            interpretation: "Se definido em percentagem, aplica-se sobre o valor nominal da nova ação."
        },
        {
            stepNumber: "3.5",
            title: "Cotação Ajustada (C')",
            formula: "C' = [(Aa × C) + (Aa × Pe)] / (Aa + An)",
            substitution: `C' = [(${formatCurrency(Number(result.CPrime.substitutionMap.Aa))} × ${formatNumber(Number(result.CPrime.substitutionMap.C))}) + (${formatCurrency(Number(result.CPrime.substitutionMap.Aa))} × ${formatCurrency(Number(result.CPrime.substitutionMap.Pe))})] / (${formatCurrency(Number(result.CPrime.substitutionMap.Aa))} + ${formatNumber(Number(result.CPrime.substitutionMap.An))})`,
            result: result.CPrime.rawResult,
            explanation: "Correção do valor de mercado teórico após a entrada do novo capital.",
            interpretation: "O numerador utiliza Aa em ambos os termos, conforme metodologia específica da disciplina."
        },
        {
            stepNumber: "3.6",
            title: "Valor Teórico (VT)",
            formula: "VT = Aa / An",
            substitution: `VT = ${formatCurrency(Number(result.VT.substitutionMap.Aa))} / ${formatNumber(Number(result.VT.substitutionMap.An))}`,
            result: result.VT.rawResult,
            explanation: "Valor de referência por cada ação nova teórica.",
            interpretation: "Indicador base para cálculo dos direitos."
        },
        {
            stepNumber: "3.7",
            title: "Direito Teórico (DT)",
            formula: "DT = C' / VT",
            substitution: `DT = ${formatCurrency(result.DT.substitutionMap["C'"] as number)} / ${formatCurrency(result.DT.substitutionMap.VT as number)}`,
            result: result.DT.rawResult,
            explanation: "Valor teórico do direito inerente à posição antiga.",
            interpretation: "Expressa quanto vale o direito de preferência em termos de cotação ajustada."
        },
        {
            stepNumber: "3.8",
            title: "Direito de Subscrição (DS)",
            formula: "DS = (C' - Pe) / VT",
            substitution: `DS = (${formatCurrency(result.DS.substitutionMap["C'"] as number)} - ${formatCurrency(result.DS.substitutionMap.Pe as number)}) / ${formatCurrency(result.DS.substitutionMap.VT as number)}`,
            result: result.DS.rawResult,
            explanation: "Valor financeiro do direito de subscrever novas ações.",
            interpretation: "Representa a economia teórica ou vantagem de quem já é acionista face ao preço de mercado ajustado."
        },
        {
            stepNumber: "3.9",
            title: "Direito de Incorporação (DI)",
            formula: "DI = C' / VT",
            substitution: `DI = ${formatCurrency(result.DI.substitutionMap["C'"] as number)} / ${formatCurrency(result.DI.substitutionMap.VT as number)}`,
            result: result.DI.rawResult,
            explanation: "Componente do direito associada à incorporação de reservas (se aplicável, matematicamente igual ao DT nesta metodologia).",
            interpretation: "Na ausência de incorporação explícita, reflete o valor teórico base."
        }
    ];
};
