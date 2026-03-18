'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import * as Icons from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { useState } from 'react';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#8EF0B5]/30 flex flex-col pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[-20%] w-[50%] h-[50%] bg-[#8EF0B5]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full"></div>
      </div>

      <Header />
      
      <main className="flex-1 relative z-10 max-w-[1400px] mx-auto w-full px-8 pb-32">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto pt-10 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
            <Icons.Mail size={16} className="text-[#8EF0B5]" />
            <span className="text-sm font-semibold tracking-wide text-gray-300">
              {lang === 'tr' ? 'İLETİŞİME GEÇİN' : 'CONTACT US'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {lang === 'tr' ? (
              <>Otonom Geleceğinizi<br/> <span className="text-[#8EF0B5]">Birlikte</span> Planlayalım.</>
            ) : (
              <>Let's Plan Your Autonomous<br/>Future <span className="text-[#8EF0B5]">Together</span>.</>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            {lang === 'tr'
              ? 'Şirketiniz için en doğru yapay zeka araçlarını belirlemek, demo talep etmek veya projeniz hakkında konuşmak bizimle iletişime geçin.'
              : 'Contact us to determine the right AI tools for your company, request a demo, or discuss your project.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Sol Kolon - İletişim Bilgileri */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                {lang === 'tr' ? 'Kurumsal Çözümler İçin Yanınızdayız' : 'We Stand by You for Enterprise Solutions'}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {lang === 'tr'
                  ? 'Satış süreçlerinizi, içerik operasyonlarınızı ve şirketinizin pazarlama performansını otonom hale getirmek için uzman mühendislerimizle görüşmeye hazır mısınız?'
                  : 'Are you ready to speak with our expert engineers to make your sales processes, content operations, and marketing performance autonomous?'
                }
              </p>
            </div>

            <div className="grid gap-8">
              {/* İletişim Kartı 1 */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#8EF0B5]/10 border border-[#8EF0B5]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#8EF0B5]/20 transition-all duration-300">
                  <Icons.AtSign size={24} className="text-[#8EF0B5]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-1 mt-1">
                    {lang === 'tr' ? 'Email İle Ulaşın' : 'Reach via Email'}
                  </h4>
                  <p className="text-gray-400 mb-2 font-light">
                    {lang === 'tr' ? 'Tüm sorularınız, demo talepleriniz ve ortaklıklar için.' : 'For all your questions, demo requests, and partnerships.'}
                  </p>
                  <a href="mailto:hello@agentolabs.com" className="text-[#8EF0B5] hover:text-[#8EF0B5]/80 font-medium inline-flex items-center gap-2 transition-colors">
                    hello@agentolabs.com
                    <Icons.ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* İletişim Kartı 2 */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <Icons.MapPin size={24} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-1 mt-1">
                    {lang === 'tr' ? 'Genel Merkez' : 'Headquarters'}
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {lang === 'tr' ? 'Ar-Ge ve Yönetim Ofisi' : 'R&D and Executive Office'}<br/>
                    {lang === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
                  </p>
                </div>
              </div>

              {/* İletişim Kartı 3 */}
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                  <Icons.Clock size={24} className="text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xl mb-1 mt-1">
                    {lang === 'tr' ? 'Çalışma Saatlerimiz' : 'Working Hours'}
                  </h4>
                  <p className="text-gray-400 font-light">
                    {lang === 'tr' ? 'Pazartesi - Cuma, 09:00 - 18:00' : 'Monday - Friday, 09:00 - 18:00'}<br/>
                    {lang === 'tr' ? 'Yapay zeka sistemlerimiz ise ' : 'While our AI systems run '}
                    <strong className="text-white">24/7.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof / Mini Stats */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400">{lang === 'tr' ? 'Sistemler Aktif' : 'Systems Active'}</span>
                </div>
                <span>{lang === 'tr' ? 'Tüm AgentoLabs altyapısı kesintisiz hizmet veriyor.' : 'All AgentoLabs infrastructure is running seamlessly.'}</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - İletişim Formu */}
          <div className="bg-[#13151A]/80 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-[32px] relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-700 delay-200 shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8EF0B5] to-transparent opacity-50"></div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{lang === 'tr' ? 'Hemen İletişime Geçin' : 'Contact Us Promptly'}</h3>
            <p className="text-gray-400 mb-8">{lang === 'tr' ? 'Bilgilerinizi bırakın, uzman ekibimiz en kısa sürede sizinle iletişime geçsin.' : 'Leave your details, and our expert team will contact you shortly.'}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={lang === 'tr' ? "Adınız Soyadınız" : "Your Full Name"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">{lang === 'tr' ? 'E-Posta' : 'Email'}</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="corporate@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">{lang === 'tr' ? 'Şirket Adı' : 'Company Name'}</label>
                  <input 
                    type="text" 
                    placeholder={lang === 'tr' ? "Şirketiniz" : "Your Company"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">{lang === 'tr' ? 'İlgilendiğiniz Çözüm' : 'Solution of Interest'}</label>
                  <select 
                    className="w-full bg-[#13151A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-light appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value="none">{lang === 'tr' ? 'Bir seçim yapınız...' : 'Select an option...'}</option>
                    <option value="otonom_ajan">{lang === 'tr' ? 'Otonom Ajan' : 'Autonomous Agent'}</option>
                    <option value="whatsapp_satis">{lang === 'tr' ? 'WhatsApp Satış Otomasyonu' : 'WhatsApp Sales Automation'}</option>
                    <option value="structa_ai">{lang === 'tr' ? 'Structa AI (İçerik Stüdyosu)' : 'Structa AI (Content Studio)'}</option>
                    <option value="pharma_ai">{lang === 'tr' ? 'Pharma AI & Eczaport' : 'Pharma AI & Eczaport'}</option>
                    <option value="all">{lang === 'tr' ? 'Sistem Entegrasyonu (Genel)' : 'System Integration (General)'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">{lang === 'tr' ? 'Mesajınız' : 'Your Message'}</label>
                <textarea 
                  required
                  rows={4}
                  placeholder={lang === 'tr' ? "İşletmenizin ihtiyaçlarını ve hedeflerinizi kısaca bizlerle paylaşın." : "Briefly share your business needs and goals with us."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8EF0B5]/50 focus:ring-1 focus:ring-[#8EF0B5]/50 transition-all font-light resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className="w-full h-14 bg-[#8EF0B5] hover:bg-[#8EF0B5]/90 text-black font-bold text-lg rounded-xl flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(142,240,181,0.2)] hover:shadow-[0_4px_25px_rgba(142,240,181,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'idle' && (
                  <>
                    {lang === 'tr' ? 'Gönder' : 'Submit'} <Icons.Send size={18} className="ml-2" />
                  </>
                )}
                {formStatus === 'submitting' && (
                  <Icons.Loader2 size={24} className="animate-spin" />
                )}
                {formStatus === 'success' && (
                  <>
                    <Icons.CheckCircle2 size={20} className="mr-2" /> {lang === 'tr' ? 'Başarıyla Gönderildi' : 'Sent Successfully'}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                {lang === 'tr' 
                ? 'Göndererek Gizlilik Politikasını ve KVKK metnini kabul etmiş olursunuz.'
                : 'By submitting, you agree to our Privacy Policy and Terms of Service.'}
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
