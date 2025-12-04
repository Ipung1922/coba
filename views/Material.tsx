import React from 'react';
import ShellTable from '../components/ShellTable';

const Material: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 pb-24 text-gray-200">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-neon-cyan">Materi Pembelajaran</h1>
        <p className="text-lg text-gray-400">Konfigurasi Elektron Model Bohr (Kulit Atom)</p>
      </div>

      {/* Section 1: Pengertian */}
      <section className="bg-science-900/50 p-6 rounded-2xl border border-science-800 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-neon-purple mb-4">1. Pengertian</h2>
        <p className="leading-relaxed">
          <strong className="text-white">Konfigurasi elektron</strong> adalah susunan elektron-elektron pada sebuah atom, molekul, atau struktur fisik lainnya. Menurut model atom <strong className="text-white">Niels Bohr</strong>, elektron mengelilingi inti atom pada lintasan-lintasan tertentu yang disebut <strong>Kulit Atom</strong>.
        </p>
        <div className="mt-4 flex justify-center">
            <div className="bg-white p-2 rounded-lg max-w-xs">
                 <img src="https://picsum.photos/300/200?grayscale" alt="Ilustrasi Model Bohr" className="rounded opacity-80" />
                 <p className="text-xs text-black text-center mt-1 font-semibold">Ilustrasi Model Atom Bohr</p>
            </div>
        </div>
      </section>

      {/* Section 2: Tabel Kulit */}
      <section className="bg-science-900/50 p-6 rounded-2xl border border-science-800 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-neon-purple mb-4">2. Aturan Kulit Atom</h2>
        <p className="mb-6 leading-relaxed">
          Jumlah maksimum elektron yang dapat menempati setiap kulit ditentukan oleh rumus <code className="bg-science-950 px-2 py-1 rounded text-neon-cyan font-mono text-lg">2n²</code>, di mana <em>n</em> adalah nomor kulit.
        </p>
        <ShellTable />
        <div className="mt-4 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-200 text-sm">
           <strong>Catatan Penting:</strong> Kulit paling luar (kulit valensi) tidak boleh mengandung lebih dari <strong>8 elektron</strong> (Aturan Oktet) untuk kestabilan, kecuali pada kulit K (maksimal 2).
        </div>
      </section>

      {/* Section 3: Cara Pengisian */}
      <section className="bg-science-900/50 p-6 rounded-2xl border border-science-800 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-neon-purple mb-4">3. Contoh Pengisian Elektron</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-science-950 p-4 rounded-xl border border-science-800">
                <h3 className="text-lg font-bold text-white mb-2">Atom Netral: Kalium (K)</h3>
                <p className="text-sm mb-2">Nomor Atom (Z) = 19</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                    <li>Kulit K (n=1): Penuh 2 elektron. Sisa 17.</li>
                    <li>Kulit L (n=2): Penuh 8 elektron. Sisa 9.</li>
                    <li>Kulit M (n=3): Tidak bisa diisi 18 (sisa cuma 9).</li>
                    <li>Aturan stabil: Isi 8 dulu. Sisa 1.</li>
                    <li>Kulit N (n=4): Isi 1 elektron.</li>
                </ul>
                <div className="mt-3 font-mono bg-black/30 p-2 rounded text-center text-neon-cyan">
                    Konfigurasi: 2 . 8 . 8 . 1
                </div>
            </div>

            <div className="bg-science-950 p-4 rounded-xl border border-science-800">
                <h3 className="text-lg font-bold text-white mb-2">Ion Bermuatan: Magnesium (Mg²⁺)</h3>
                <p className="text-sm mb-2">Nomor Atom Mg = 12</p>
                <div className="space-y-2 text-sm text-gray-300">
                    <p>Konfigurasi Asli: <span className="font-mono text-neon-blue">2 . 8 . 2</span></p>
                    <p>Melepas 2 elektron agar stabil (oktet).</p>
                    <p>Elektron di kulit terluar (2) hilang.</p>
                </div>
                <div className="mt-6 font-mono bg-black/30 p-2 rounded text-center text-neon-cyan">
                    Konfigurasi Ion: 2 . 8
                </div>
            </div>
        </div>
      </section>

      {/* Section 4: Golongan & Periode */}
      <section className="bg-science-900/50 p-6 rounded-2xl border border-science-800 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-neon-purple mb-4">4. Golongan & Periode</h2>
        <p className="mb-4">Kita dapat menentukan letak unsur di Tabel Periodik menggunakan konfigurasi kulit.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                 <h3 className="font-bold text-blue-400 text-lg mb-2">Golongan (Vertikal)</h3>
                 <p className="text-sm">Ditentukan oleh <strong>Jumlah Elektron Valensi</strong> (elektron kulit terluar).</p>
                 <p className="text-xs mt-2 text-gray-400">Contoh: 2.8.<strong className="text-white">1</strong> → Golongan I A</p>
             </div>
             <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                 <h3 className="font-bold text-green-400 text-lg mb-2">Periode (Horizontal)</h3>
                 <p className="text-sm">Ditentukan oleh <strong>Jumlah Kulit</strong> yang terisi.</p>
                 <p className="text-xs mt-2 text-gray-400">Contoh: <span className="underline decoration-white">2</span>.<span className="underline decoration-white">8</span>.<span className="underline decoration-white">1</span> (3 kulit) → Periode 3</p>
             </div>
        </div>
      </section>

    </div>
  );
};

export default Material;