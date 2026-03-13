import { useState } from "react";
import { InputForm } from "./components/InputForm";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { MethodBadge } from "./components/MethodBadge";
import { Visuals } from "./components/Visuals";
import type { InputData, PedagogicalStep, AcademicResult } from "./core/types";
import { resolveExercise } from "./core/academicResolver";
import { generatePedagogicalSteps } from "./core/pedagogy";
import { BookOpen } from "lucide-react";

function App() {
  const [data, setData] = useState<InputData>({
    nomOld: 0,
    nomNew: 0,
    capitalBefore: 0,
    emissionPriceRaw: 0,
    isPercentage: false
  });

  const [steps, setSteps] = useState<PedagogicalStep[]>([]);
  const [rawResult, setRawResult] = useState<AcademicResult | null>(null);

  const handleCalculate = () => {
    try {
      const result = resolveExercise(data);
      const generatedSteps = generatePedagogicalSteps(result);
      setRawResult(result);
      setSteps(generatedSteps);

      // Auto scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (e: any) {
      alert("Erro no cálculo: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Calculadora de Mercado de Capitais</h1>
              <p className="text-xs text-slate-500">Aumentos de Capital • Metodologia Académica</p>
            </div>
          </div>
          <MethodBadge />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Intro Text */}
        <section className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Esta ferramenta resolve exercícios de aumentos de capital seguindo estritamente
            o método lecionado. Preencha os dados abaixo para obter a resolução passo a passo.
          </p>
        </section>

        {/* Input Section */}
        <section>
          <InputForm
            data={data}
            onChange={setData}
            onCalculate={handleCalculate}
          />
        </section>

        {/* Results Section */}
        {rawResult && steps.length > 0 && (
          <section id="results-section" className="space-y-8 pt-8 border-t border-slate-200">
            <Visuals data={rawResult} />
            <ResultsDisplay steps={steps} />
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12 py-8 text-center text-slate-400 text-sm">
        <p>© 2026 Academic Finance Tools. Desenvolvido para apoio ao estudo.</p>
      </footer>
    </div>
  );
}

export default App;
