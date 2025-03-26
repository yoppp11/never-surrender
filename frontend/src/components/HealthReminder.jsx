import './styles/HealthReminder.css'

export default function HealthReminder(){
    const healthTips = [
        "Minum air putih minimal 8 gelas sehari",
        "Istirahat yang cukup (7-8 jam per hari)",
        "Lakukan olahraga ringan 30 menit setiap hari",
        "Makan buah dan sayur setiap hari",
        "Periksa kesehatan rutin 6 bulan sekali"
      ]

    return (
        <div className="health-reminder">
            <h3 className="reminder-title">Tips Kesehatan Hari Ini</h3>
            <ul className="reminder-list">
                {healthTips.map((tip, index) => (
                <li key={index} className="reminder-item">
                    <span className="reminder-icon">✓</span>
                    {tip}
                </li>
                ))}
            </ul>
        </div>
    )
}