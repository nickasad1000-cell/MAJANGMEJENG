import { useState } from 'react';
import { supabase } from '../lib/supabase-client';

type Step = 1 | 2 | 3;

const STEPS: Record<Step, string> = { 1: 'Konteks', 2: 'Layanan', 3: 'Detail' };

interface Service {
  id: string;
  title: string;
}

export default function BriefWizard({ waNumber, services }: { waNumber: string; services: Service[] }) {
  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState<'forward' | 'back'>('forward');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [context, setContext] = useState('');
  const [details, setDetails] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const goNext = () => {
    if (step === 1 && !name.trim()) return;
    if (step === 2 && !service) return;
    setDir('forward');
    setStep((s) => Math.min(3, s + 1) as Step);
  };
  const goBack = () => {
    setDir('back');
    setStep((s) => Math.max(1, s - 1) as Step);
  };

  const submit = async () => {
    if (!details.trim() || honeypot.trim() !== '') return;
    try {
      await supabase.from('submissions').insert({
        kind: 'brief',
        payload: { service, context, details },
        contact_name: name || null,
        contact_email: null,
        contact_wa: null,
        honeypot,
        user_agent: navigator.userAgent,
      });
    } catch {
      /* submission best-effort — WhatsApp is the primary channel */
    }
    setSent(true);
  };

  const waText = [
    name ? `Halo Majang Mejeng, saya ${name}.` : 'Halo Majang Mejeng.',
    '',
    `Saya ingin membicarakan proyek: ${service}`,
    context ? `Konteks: ${context}` : '',
    '',
    'Titik awal:',
    details || '(belum ada detail, ingin mulai ngobrol dulu)',
    '',
    'Terima kasih.',
  ].filter((l) => l !== undefined).join('\n');

  if (sent) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <p className="eyebrow mb-3">TERKIRIM</p>
        <h2 className="font-serif text-3xl">Terima kasih, {name || 'kawan'}.</h2>
        <p className="mt-3 text-muted-foreground">Brief Anda sudah masuk. Untuk respons cepat, buka juga:</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Lanjut ke WhatsApp <span aria-hidden>→</span>
          </a>
          <a href="/" className="btn-outline">Kembali ke beranda</a>
        </div>
      </div>
    );
  }

  const inputCls =
    'mt-2 w-full border-b border-foreground/35 bg-transparent py-2 text-lg focus:border-secondary focus:outline-none aria-[invalid=true]:border-destructive';
  const err = (k: string) =>
    touched[k] && (
      <p id={`${k}-err`} className="mt-2 block text-xs text-destructive" role="alert">
        {k === 'name' ? 'Nama atau sapaan wajib diisi.' : 'Pilih salah satu layanan.'}
      </p>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        step < 3 ? goNext() : submit();
      }}
      className="space-y-6"
      noValidate
    >
      {/* Step label (tanpa angka statis 1-2-3 yang tidak interaktif) */}
      <div className="flex items-center font-mono text-xs text-muted-foreground" aria-live="polite">
        <span className="uppercase tracking-wider">{STEPS[step]}</span>
        <span className="ml-2 text-foreground/50">·</span>
        <span className="ml-2">{step} dari 3</span>
        <span className="sr-only">
          Langkah {step} dari 3
        </span>
      </div>

      <div className={dir === 'forward' ? 'mm-step-forward' : 'mm-step-back'}>
        {step === 1 && (
          <div>
            <label htmlFor="bw-name" className="block">
              <span className="eyebrow">SIAPA ANDA</span>
              <input
                id="bw-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Nama atau sapaan"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={touched.name && !name}
                aria-describedby={touched.name && !name ? 'name-err' : undefined}
                className={inputCls}
              />
              {err('name')}
            </label>
            <div className="mt-6">
              <span className="eyebrow">CERITAIN SINGKAT KONTEKSNYA (OPSIONAL)</span>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Contoh: dokumentasi kegiatan desa"
                className={inputCls}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="bw-service" className="block">
              <span className="eyebrow">LAYANAN YANG DIMINTA</span>
              <select
                id="bw-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, service: true }))}
                required
                aria-required="true"
                aria-invalid={touched.service && !service}
                aria-describedby={touched.service && !service ? 'service-err' : undefined}
                className={inputCls}
              >
                <option value="">— pilih layanan —</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Lainnya / belum tahu">Lainnya / belum tahu</option>
              </select>
              {err('service')}
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <label htmlFor="bw-details" className="block">
              <span className="eyebrow">TULIS BRIEF SINGKAT</span>
              <textarea
                id="bw-details"
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ceritakan apa yang ingin dibuat…"
                className={`${inputCls} resize-y`}
              />
            </label>
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
              <label>
                Jangan diisi:
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        {step > 1 && (
          <button type="button" onClick={goBack} className="btn-outline">
            ← Kembali
          </button>
        )}
        <button type="submit" className="btn-primary ml-auto">
          {step < 3 ? 'Lanjut' : 'Kirim brief'} <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
