import React, { useState } from 'react';
import { RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

export const FrenchRevolutionExperiment: React.FC = () => {
  const [privilegeExemption, setPrivilegeExemption] = useState<number>(95); // 95% historical
  const [harvestFailure, setHarvestFailure] = useState<number>(85); // 85% catastrophic 1788 hail
  const [warDebtShare, setWarDebtShare] = useState<number>(55); // 55% of royal budget to debt interest

  // Historical systemic model calculations
  // 1. Royal Treasury Deficit (in millions of Livres, base revenue ~500M)
  // If aristocracy paid full share, revenue would rise by ~180M livres
  const lostTaxRevenue = (privilegeExemption / 100) * 160;
  const debtExpense = (warDebtShare / 100) * 310;
  const deficitLivres = Math.round(lostTaxRevenue + debtExpense - 190);

  // 2. Bread Price Burden (% of daily wage of Parisian sans-culotte artisan)
  // Baseline = 45% of daily wage; extreme crop failure pushes to 88%
  const breadPricePercent = Math.round(45 + (harvestFailure / 100) * 43);

  // 3. Rebellion Risk Index (0 - 100)
  const rebellionScore = Math.min(
    100,
    Math.round(
      (breadPricePercent - 40) * 1.3 +
      (deficitLivres > 80 ? 25 : deficitLivres > 30 ? 15 : 0) +
      (privilegeExemption > 75 ? 15 : 0)
    )
  );

  // Milestone triggers based on historical tipping points
  let historicalEvent = 'Status Quo: Strained Monarchy';
  let eventDetail = 'Tensions simmer, but absolute royal authority remains intact.';
  let eventBadgeColor = 'bg-slate-100 text-slate-800 border-slate-300';

  if (rebellionScore >= 85) {
    historicalEvent = 'July 14, 1789: Storming of the Bastille';
    eventDetail = 'Bread at 88% of daily wage triggers urban insurrection; royal troops defect; the Ancien Régime collapses.';
    eventBadgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
  } else if (breadPricePercent >= 75) {
    historicalEvent = 'May–June 1789: Tennis Court Oath & The Great Fear';
    eventDetail = 'Starvation in the provinces causes bread riots. Third Estate deputies refuse royal dissolution.';
    eventBadgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
  } else if (deficitLivres >= 100) {
    historicalEvent = 'May 1789: Estates-General Convoked';
    eventDetail = 'Impending sovereign default forces Louis XVI to convene the dormant assembly of three estates.';
    eventBadgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
  } else if (privilegeExemption < 30 && deficitLivres < 40) {
    historicalEvent = 'Counterfactual Reform: Constitutional Stability';
    eventDetail = 'Universal land taxation successfully services war debt. Estates-General is avoided.';
    eventBadgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  }

  const handleResetHistorical = () => {
    setPrivilegeExemption(95);
    setHarvestFailure(85);
    setWarDebtShare(55);
  };

  const handleApplyReform = () => {
    // What if nobility paid taxes?
    setPrivilegeExemption(10);
    setHarvestFailure(20);
    setWarDebtShare(30);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Interactive Lab
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-100 text-rose-800 font-semibold">
              1789 State Fragility Simulator
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Macroeconomic Pressures & Civil Rebellion Model
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyReform}
            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            Test 1787 Tax Reform
          </button>
          <button
            onClick={handleResetHistorical}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset 1789 Crisis</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: The State Stability Dashboard */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 text-white relative shadow-inner overflow-hidden min-h-[360px] space-y-6">
          
          {/* Historical Event Banner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Systemic Historical State
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${eventBadgeColor}`}>
                {historicalEvent}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              {eventDetail}
            </p>
          </div>

          {/* Key Gauges */}
          <div className="space-y-4">
            
            {/* Gauge 1: Popular Rebellion Probability */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <ShieldAlert className={`w-4 h-4 ${rebellionScore > 75 ? 'text-rose-400' : 'text-amber-400'}`} />
                  <span>Popular Insurrection Risk:</span>
                </span>
                <span className={`font-mono font-bold ${
                  rebellionScore > 75 ? 'text-rose-400' : rebellionScore > 45 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {rebellionScore}% ({rebellionScore > 75 ? 'Revolution Imminent' : rebellionScore > 45 ? 'Volatile Tension' : 'Stable'})
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    rebellionScore > 75 ? 'bg-rose-500' : rebellionScore > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${rebellionScore}%` }}
                />
              </div>
            </div>

            {/* Gauge 2: Bread Price as % of Wage */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Bread Cost (% of Laborer Daily Wage):</span>
                <span className="font-mono font-bold text-amber-300">{breadPricePercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, breadPricePercent)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Normal Subsistence: ~45%</span>
                <span className="text-rose-400">Starvation Threshold: &gt;75%</span>
              </div>
            </div>

            {/* Gauge 3: Treasury Deficit */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Annual Crown Budget Deficit:</span>
                <span className="font-mono font-bold text-rose-400">{deficitLivres} Million Livres</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, deficitLivres / 2))}%` }}
                />
              </div>
            </div>

          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            In 1789, France was caught in a compounding feedback loop: fiscal paralysis prevented famine relief, while famine destroyed popular legitimacy.
          </div>
        </div>

        {/* Right: The Sliders (Systemic Levers) */}
        <div className="lg:col-span-6 space-y-5">
          
          <div className="space-y-4">
            
            {/* Slider 1: Aristocratic & Church Tax Exemption */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  1st & 2nd Estate Tax Exemption Rate:
                </label>
                <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {privilegeExemption}% exempt
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={privilegeExemption}
                onChange={(e) => setPrivilegeExemption(parseInt(e.target.value, 10))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (Equal Land Tax)</span>
                <span>Historical 1789: 95%</span>
              </div>
            </div>

            {/* Slider 2: 1788-1789 Crop Harvest Failure */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  Crop Harvest Deficit (Climatic Shock):
                </label>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {harvestFailure}% failure
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={harvestFailure}
                onChange={(e) => setHarvestFailure(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (Bountiful Harvest)</span>
                <span>Historical Hail of 1788: 85%</span>
              </div>
            </div>

            {/* Slider 3: Sovereign War Debt Service */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800">
                  Sovereign Budget Committed to Debt Interest:
                </label>
                <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {warDebtShare}% of revenues
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={warDebtShare}
                onChange={(e) => setWarDebtShare(parseInt(e.target.value, 10))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10% (Solvent)</span>
                <span>Historical Post-American War: 55%</span>
              </div>
            </div>

          </div>

          {/* Historical Insight Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Historical Causality Insight:</span>
            </div>
            <p className="leading-relaxed">
              Drag <strong>1st & 2nd Estate Tax Exemption</strong> to 0%. Notice how the royal budget deficit drops below 30M livres and rebellion risk drops significantly, demonstrating why historians identify institutional tax rigidity as the structural root of the revolution.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
