import GuruHomePage from "~/guru/home";

export function clientLoader() {
    const now = new Date();

    return {
        jadwalAjar: [
            {
                mataPelajaran: "Matematika",
                kelas: "X IPA 1",
                hari: "Senin",
                jamMulai: "08:00",
                jamAkhir: "09:30"
            },
            {
                mataPelajaran: "Fisika",
                kelas: "X IPA 2",
                hari: "Selasa",
                jamMulai: "10:00",
                jamAkhir: "11:30"
            }
        ],
        timestamp: {
            date: now.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }),
            time: now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit"
            }),
        }
    };
};

export default function GuruHome() {
    return <GuruHomePage />;
}