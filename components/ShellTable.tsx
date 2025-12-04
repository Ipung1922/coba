import React from 'react';

const ShellTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-science-800">
      <table className="min-w-full bg-science-900 text-science-50">
        <thead>
          <tr className="bg-science-800 text-neon-cyan">
            <th className="py-3 px-4 text-left">Nama Kulit</th>
            <th className="py-3 px-4 text-center">Nilai n</th>
            <th className="py-3 px-4 text-center">Rumus (2n²)</th>
            <th className="py-3 px-4 text-right">Maksimum Elektron</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-science-800">
          {[1, 2, 3, 4].map((n) => {
            const shellName = String.fromCharCode(75 + n - 1); // K, L, M, N
            const max = 2 * (n * n);
            return (
              <tr key={n} className="hover:bg-science-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-neon-purple">{shellName}</td>
                <td className="py-3 px-4 text-center">{n}</td>
                <td className="py-3 px-4 text-center text-gray-400">2 × ({n})²</td>
                <td className="py-3 px-4 text-right font-bold text-neon-blue">{max}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShellTable;