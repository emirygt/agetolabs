import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında agetolabs'in veri işleme süreçlerine dair aydınlatma metni.",
  alternates: { canonical: '/legal/kvkk' },
};

export default function KvkkPage() {
  return (
    <LegalPageShell eyebrow="Yasal · KVKK" title="KVKK Aydınlatma Metni" lastUpdated="2026-05-24">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Veri Sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri
          sorumlusu sıfatıyla agetolabs olarak; kişisel verilerinizin işlenmesine
          ilişkin sizleri aşağıdaki şekilde bilgilendirmek isteriz.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. İşlenen kişisel veriler</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>İletişim formu üzerinden ilettiğiniz ad, soyad, e-posta, şirket ve mesaj içeriği.</li>
          <li>Site kullanımına ilişkin teknik veriler (IP, tarayıcı, sayfa görüntüleme).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. İşleme amaçları</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Talep ve sorularınıza yanıt vermek.</li>
          <li>Hizmetlerimizi geliştirmek ve site performansını izlemek.</li>
          <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Aktarım</h2>
        <p>
          Kişisel verileriniz; barındırma, e-posta iletim ve analitik
          hizmetlerinden yararlandığımız tedarikçilere, yalnızca bu hizmetlerin
          yürütülmesi amacıyla aktarılmaktadır.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Haklarınız</h2>
        <p>
          KVKK madde 11 kapsamında kişisel verilerinize ilişkin haklarınızı
          kullanmak için
          <a href="mailto:info@agetolabs.com" className="text-[#8EF0B5] hover:underline"> info@agetolabs.com</a> adresinden bizimle iletişime
          geçebilirsiniz.
        </p>
      </section>
    </LegalPageShell>
  );
}
