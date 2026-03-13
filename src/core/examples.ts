import { resolveExercise } from "./academicResolver";
import { generatePedagogicalSteps } from "./pedagogy";

/**
 * Script de Verificação - "examples.ts"
 * Executa cenários académicos para validar a lógica.
 * 
 * Como correr: npx tsx src/core/examples.ts
 */

const separator = () => console.log("-".repeat(50));

const runScenario = (name: string, input: any) => {
    separator();
    console.log(`CENÁRIO: ${name}`);
    console.log("Input:", input);
    try {
        const result = resolveExercise(input);
        const steps = generatePedagogicalSteps(result);

        steps.forEach(step => {
            console.log(`[${step.stepNumber}] ${step.title}: ${step.result.toFixed(4)}`);
            // console.log(`   Explicação: ${step.explanation}`);
        });

        console.log("✅ Sucesso");
    } catch (e) {
        console.error("❌ Erro:", e);
    }
};

// Cenário 1: Dados Hipotéticos Simples
// Vamos inventar valores fáceis para testar a matemática.
// Nom_old = 2, Nom_new = 3
// C = 2 * 3 = 6
// Aa = 600
// An = 600 / 6 = 100
// Pe = 1 (Absoluto)
// C' = [(600*6) + (600*1)] / (600 + 100) = (3600 + 600) / 700 = 4200 / 700 = 6
// VT = 600 / 100 = 6
// DT = 6 / 6 = 1
// DS = (6 - 1) / 6 = 5/6 = 0.8333
// DI = 6/6 = 1
runScenario("Teste Básico Matemático", {
    nomOld: 2,
    nomNew: 3,
    capitalBefore: 600,
    emissionPriceRaw: 1,
    isPercentage: false
});

// Cenário 2: Pe em Percentagem
// Pe = 50% de NomNew (3) = 1.5
// C = 6
// An = 100
// Pe = 1.5
// C' = [(3600) + (600*1.5)] / 700 = (3600 + 900) / 700 = 4500 / 700 = 6.4285
// VT = 6
// DT = 6.4285 / 6 = 1.0714
// DS = (6.4285 - 1.5) / 6 = 0.8214
// DI = 1.0714
runScenario("Teste Percentagem (50%)", {
    nomOld: 2,
    nomNew: 3,
    capitalBefore: 600,
    emissionPriceRaw: 0.5, // 50% = 0.5 decimal? Ou input raw seria 50?
    // Resolver espera raw. Se isPercentage=true, divide por 100?
    // Verifiquemos academicResolver: "const peMultiplier = input.isPercentage ? (input.emissionPriceRaw / 100) : input.emissionPriceRaw;"
    // Então se eu quero 50%, passo 50.
    emissionPriceRaw: 50,
    isPercentage: true
});

