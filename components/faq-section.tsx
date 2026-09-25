import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "SMK Cyber Media — Jakarta • Pengembangan Gim",
    answer:
      "SMK Cyber Media Jakarta adalah sekolah menengah kejuruan swasta-gratis berakreditasi A yang berlokasi di Pancoran, Jakarta Selatan. Sekolah yang berada di bawah naungan Yayasan Kaum Ibu Kebayoran ini dikenal sebagai salah satu sekolah kejuruan kreatif dengan program unggulan di bidang teknologi dan komunikasi. Saat ini menempuh pengembangan gim (game development) dengan fokus membangun fondasi logika, OOP, dan algoritma untuk gim 2D/3D serta aplikasi desktop yang efisien.",
  },
  {
    question: "Fokus Pelajaran: Pemrograman Berbasis Objek (OOP)",
    answer:
      "Mempelajari konsep OOP — class, inheritance, polymorphism, dan encapsulation untuk membangun struktur kode yang rapi dan mudah dikembangkan pada proyek gim dan aplikasi.",
  },
  {
    question: "Fokus Pelajaran: Logika & Algoritma Game",
    answer:
      "Mendalami logika gameplay, flow state pemain, collision detection, dan optimasi performa untuk menciptakan gim yang responsif dan menyenangkan.",
  },
  {
    question: "Fokus Pelajaran: Pengembangan Aplikasi Desktop",
    answer:
      "Membangun aplikasi desktop interaktif dengan C# Windows Forms — desain antarmuka, validasi input user, dan alur UI yang efisien.",
  },
  {
    question: "Fokus Pelajaran: Manajemen Database Dasar",
    answer:
      "Mengelola data dengan MySQL — operasi CRUD (Create, Read, Update, Delete), relasi tabel, dan integrasi database ke aplikasi desktop.",
  },
]

export function FAQSection() {
  return (
    <section id="pendidikan" className="py-32 px-6 pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Pendidikan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Latar belakang pendidikan dan fokus keahlian yang sedang dijalani.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 py-0 my-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-foreground/30"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
