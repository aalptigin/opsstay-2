import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Çözümler", href: "#cozumler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Neler yapabiliriz", href: "#neler" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F3F8FF] text-slate-900">
      {/* Top Nav */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0EA5FF] text-white font-bold">
              O
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-white">opsstay</div>
              <div className="text-[11px] text-white/70">
                Misafir Ön Kontrol & Güvenli Konaklama
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-white/85 hover:text-white transition"
              >
                {n.label}
              </a>
            ))}
            <Link
              href="/login"
              className="rounded-full bg-[#0EA5FF] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0295EE] transition"
            >
              Giriş Yap
            </Link>
          </nav>

          <Link
            href="/login"
            className="md:hidden rounded-full bg-[#0EA5FF] px-4 py-2 text-sm font-semibold text-white"
          >
            Giriş Yap
          </Link>
        </div>
        {/* top dark blur background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1220]/95 to-[#0B1220]/70 backdrop-blur" />
      </header>

      {/* HERO */}
      <section className="relative pt-16">
        <div className="relative h-[560px] w-full overflow-hidden">
          <Image
            src="/landing/hero.jpg"
            alt="Opsstay Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/55 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-2xl">
              <div className="mb-4 text-xs font-semibold tracking-[0.25em] text-white/80">
                KVKK UYUMLU ÖN KONTROL
              </div>

              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Kişisel veri yok,
                <br />
                tam kontrol sizde.
                <br />
                Otel karar verir, sistem
                <br />
                bilgilendirir.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                Opsstay, misafir geçmişini anonim ve kurumsal bir dile çevirerek,
                yalnızca operasyon için gerekli özet bilgiyi sunar. Risk uyarısı
                gelir, son kararı her zaman otel yönetimi verir.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#cozumler"
                  className="rounded-full bg-[#0EA5FF] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#0295EE] transition"
                >
                  Opsstay’i keşfedin
                </a>
                <a
                  href="#cozumler"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] shadow hover:bg-white/90 transition"
                >
                  Çözüm detaylarını inceleyin
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* spacer like screenshot */}
        <div className="h-44 bg-[#DDE7F6]" />
      </section>

      {/* ÇÖZÜMLER */}
      <section id="cozumler" className="bg-[#F3F8FF] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10">
            <div className="relative mx-auto flex w-full max-w-5xl items-end justify-center gap-6">
              <CardImage src="/landing/s1.jpg" className="hidden md:block w-[300px] h-[210px]" />
              <CardImage src="/landing/s2.jpg" className="w-[520px] h-[290px]" />
              <CardImage src="/landing/s3.jpg" className="hidden md:block w-[300px] h-[210px]" />
            </div>

            <div className="text-center">
              <div className="text-xs font-semibold tracking-[0.25em] text-[#0EA5FF]">
                TEK BAKIŞTA ÖN KONTROL ÇERÇEVESİ
              </div>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Her misafir için aynı standart,{" "}
                <span className="text-[#0EA5FF]">her karar için</span>
                <br />
                <span className="text-[#0EA5FF]">aynı güven.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
                Opsstay, kişisel veri paylaşmadan, misafir yolculuğuna dair kritik
                bilgileri tek ekranda toplar. Operasyon ekibi farklı sistemlere
                dağılmış notların peşinden koşmaz; net bir çerçeve üzerinden,
                tutarlı ve güvenli karar alır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA */}
      <section id="hakkimizda" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex rounded-full bg-[#EAF4FF] px-4 py-1 text-xs font-semibold text-[#0EA5FF]">
                Opsstay hakkında
              </span>

              <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">
                Opsstay, misafir yolculuğuna{" "}
                <span className="text-[#0EA5FF]">ön</span>
                <br />
                <span className="text-[#0EA5FF]">kontrol katmanı</span> ekler.
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                Günümüz konaklama işletmelerinde misafir bilgisi; farklı sistemlere
                dağılmış, tutarsız ve çoğu zaman operasyon ekibinin elinde
                yeterince hazırlanmış halde. Opsstay, bu dağınık yapıyı tek bir
                kurumsal görüşe çevirir.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Amacımız, resepsiyon, güvenlik, F&B ve yönetim ekiplerine misafir
                daha otele gelmeden önce “Bu misafir bizim için ne ifade ediyor?”
                sorusunun cevabını, sade ve anlaşılır bir dille sunmak.
              </p>
            </div>

            <div className="space-y-4">
              <InfoCard
                title="Neleri önemsiyoruz?"
                items={[
                  "KVKK uyumu ve kişisel verinin gizliliği",
                  "Departmanlar arası ortak ve sade bir dil",
                  "Operasyon ekibine gerçek anlamda zaman kazandırmak",
                ]}
              />
              <InfoCard
                title="Nasıl sonuçlar hedefliyoruz?"
                items={[
                  "Misafir ön kontrolünde %80’e varan zaman tasarrufu",
                  "Daha öngörülebilir check-in süreçleri",
                  "“Check edildi, sorun beklenmez” diyebildiğiniz bir misafir portföyü",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NELER / SAHADA */}
      <section id="neler" className="bg-[#F3F8FF] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <span className="inline-flex rounded-full bg-[#EAF4FF] px-4 py-1 text-xs font-semibold text-[#0EA5FF]">
            Opsstay sahada nasıl görünür?
          </span>

          <h3 className="mt-4 text-3xl font-extrabold md:text-5xl">
            Ekranda sadece bir panel değil,{" "}
            <span className="text-[#0EA5FF]">tüm ekibinize net bir çerçeve sunar.</span>
          </h3>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base">
            Aşağı kaydırdıkça; resepsiyon, güvenlik, F&B ve yönetim ekiplerinin
            Opsstay ile nasıl çalıştığını göreceksiniz. Her senaryo, operasyonun
            dilini sadeleştirir ve karar kalitesini yükseltir.
          </p>

          <div className="mt-10 space-y-10">
            <RoleRow
              chip="Ön büro ekibi"
              title="Resepsiyon / Ön Büro"
              image="/landing/role-frontdesk.jpg"
              heading="Kişisel veri yok, tam kontrol sizde."
              desc="Opsstay, misafir otele gelmeden önce geçmişini anonim ve kurumsal bir dille özetler. Ön büro ekibi, check-in anında ne ile karşılaşacağını bilir."
              bullets={[
                "Rezervasyon açıldığı anda misafir ön kontrol süreci otomatik tetiklenir.",
                "Ekip, karmaşık veriler yerine sade bir değerlendirme görür.",
                "Misafir masaya geldiğinde operasyon hazır ve sakin olur.",
              ]}
              quote="“Misafir gelmeden önce net bir özet görmek, resepsiyon ekibinin tonunu tamamen değiştiriyor.”"
            />

            <RoleRow
              chip="Güvenlik ekibi"
              title="Güvenlik / Gece Operasyonu"
              image="/landing/role-security.jpg"
              heading="Gece vardiyasında sürpriz değil, öngörü var."
              desc="Gece ekibi için misafir geçmişi önceden özetlenir, olağan dışı durumlar kurumsal bir ifadeyle belirtilir. Ekibiniz refleksle değil, bilgiyle hareket eder."
              bullets={[
                "Olası riskli durumlar, kişisel veri paylaşmadan işaretlenir.",
                "Güvenlik ve resepsiyon aynı dile, aynı ekrandan konuşur.",
                "Gece operasyonu daha kontrollü ve planlı ilerler.",
              ]}
            />

            <RoleRow
              chip="Restoran & bar"
              title="F&B / Servis Ekibi"
              image="/landing/role-fb.jpg"
              heading="Masaya oturmadan önce misafir beklentisini bilirsiniz."
              desc="Opsstay, misafirin geçmiş tercihlerini ve hassasiyetlerini özetleyerek F&B tarafına hazırlık alanı açar. Deneyim, ilk temasla birlikte başlar."
              bullets={[
                "Alerji, tercih edilen saatler, alışkanlıklar önceden görünür.",
                "Servis ekibi misafire “ilk kez görüyormuş” gibi değil, tanıyor gibi yaklaşır.",
                "Bu da otelin genel marka algısını yukarı taşır.",
              ]}
              quote="“Misafir daha sipariş vermeden neyi sevdiğini bilmek servisin kalitesini ciddi etkiliyor.”"
            />

            <RoleRow
              chip="Genel müdür & gelir"
              title="Yönetim / Revenue"
              image="/landing/role-management.jpg"
              heading="Oda numarasından değil, ilişki değerinden bakarsınız."
              desc="Opsstay, misafirleri tek tek olaylar yerine bütün yolculuklarıyla gösterir. Böylece stratejik kararlar daha net ve veri destekli alınır."
              bullets={[
                "Operasyonel riskler ile değerli misafir segmentleri ayrışır.",
                "Farklı departmanların notları ortak ve standart bir dile oturtulur.",
                "Yönetim, misafir portföyüne büyük resimden bakabilir.",
              ]}
              quote="“Opsstay, misafirlerimizi sadece ‘oda’ değil, ‘ilişki’ olarak görmemizi sağladı.”"
            />
          </div>

          <footer className="mt-16 text-xs text-slate-500">
            © 2025 Opsstay. Tüm hakları saklıdır.
          </footer>
        </div>
      </section>
    </main>
  );
}

function CardImage({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] shadow-[0_10px_40px_rgba(2,6,23,0.18)] ${className}`}>
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F7FBFF] p-6 shadow-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#0EA5FF]" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleRow(props: {
  chip: string;
  title: string;
  image: string;
  heading: string;
  desc: string;
  bullets: string[];
  quote?: string;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[560px_1fr]">
      <div className="relative overflow-hidden rounded-[28px] shadow-[0_12px_44px_rgba(2,6,23,0.18)]">
        <Image src={props.image} alt="" width={1120} height={720} className="h-[320px] w-full object-cover md:h-[340px]" />
        <div className="absolute left-5 top-5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {props.chip}
        </div>
        <div className="absolute left-5 top-16 text-2xl font-extrabold text-white drop-shadow">
          {props.title}
        </div>
        <div className="absolute bottom-5 left-5 right-5 text-xs text-white/85 drop-shadow">
          Bu görselleri otelinizden gerçek karelerle güncelleyerek, Opsstay’in sahadaki kullanımını misafir yolculuğu üzerinden gösterebilirsiniz.
        </div>
      </div>

      <div>
        <h4 className="text-2xl font-extrabold text-slate-900">{props.heading}</h4>
        <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">{props.desc}</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
          {props.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-[10px] h-2 w-2 rounded-full bg-[#0EA5FF]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {props.quote && (
          <div className="mt-4 border-l-2 border-[#0EA5FF] pl-4 text-sm italic text-slate-500">
            {props.quote}
          </div>
        )}
      </div>
    </div>
  );
}
