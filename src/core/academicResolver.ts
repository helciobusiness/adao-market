import type { InputData, AcademicResult } from "./types";
import * as Engine from "./engine";

/**
 * Módulo: AcademicResolver
 * Responsabilidade: Orquestrar, Validar e Inferir dados antes de chamar o Engine.
 * É a camada "inteligente" que prepara o terreno para o cálculo puro.
 */

export const resolveExercise = (input: InputData): AcademicResult => {
    // 1. Normalização de Inputs
    // Converter percentagem bruta (ex: 20) para decimal (0.2) se flag ativa.
    // Assumimos que se o user diz "20" e "é %", matematicamente é 0.2 no cálculo.
    const peMultiplier = input.isPercentage ? (input.emissionPriceRaw / 100) : input.emissionPriceRaw;

    // 2. Cálculos Sequenciais (Ordem da Metodologia)

    // 3.1 C
    const stepC = Engine.calculateC(input.nomOld, input.nomNew);
    const C = stepC.rawResult;

    // 3.2 Aa is given (Capital Before)
    const Aa = input.capitalBefore;

    // 3.3 An
    const stepAn = Engine.calculateAn(Aa, C);
    const An = stepAn.rawResult;

    // 3.4 Pe
    // Se for percentagem, Engine calcula NomNew * (input/100)
    // Se não, é o valor direto.
    // O engine aceita o multiplier já tratado ou o raw?
    // Minha engine.calculatePe espera: (nomNew, inputVal, isPercentage)
    // Se isPercentage=true, ela faz nomNew * inputVal.
    // Se eu passar 20, vira nomNew * 20. O correto é nomNew * 0.2.
    // Então passamos o peMultiplier e dizemos que NÃO é percentagem para o engine não multiplicar de novo?
    // Não, melhor respeitar a assinatura do Engine.
    // Engine diz: "Pe = Valor nominal da nova ação × percentagem"
    // Se input.emissionPriceRaw = 20 (%), passamos 0.20?
    // Vamos passar o decimal para a engine e tratar como "factor".
    const stepPe = Engine.calculatePe(input.nomNew, peMultiplier, input.isPercentage);
    // Wait, if I pass isPercentage=true to engine, it does `nomNew * inputVal`.
    // If inputVal is 0.2, then `nomNew * 0.2`. Correct.
    const Pe = stepPe.rawResult;

    // 3.5 C'
    const stepCPrime = Engine.calculateCPrime(Aa, C, Pe, An);
    const CPrime = stepCPrime.rawResult;

    // 3.6 VT
    const stepVT = Engine.calculateVT(Aa, An);
    const VT = stepVT.rawResult;

    // 3.7 DT
    const stepDT = Engine.calculateDT(CPrime, VT);

    // 3.8 DS
    const stepDS = Engine.calculateDS(CPrime, Pe, VT);

    // 3.9 DI
    const stepDI = Engine.calculateDI(CPrime, VT);

    return {
        C: stepC,
        An: stepAn,
        Pe: stepPe,
        CPrime: stepCPrime,
        VT: stepVT,
        DT: stepDT,
        DS: stepDS,
        DI: stepDI
    };
};
