import './styles/HealthReminder.css'

export default function HealthReminder({data}){
    // const [remind, setRemind] = useState([])

    // async function fetchHealthTips(){
    //     try {
    //         const response = await http({
    //             method: 'GET',
    //             url: '/ai/reccomendations',
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //             }
    //         })
    //         // const data = await response.json()
    //         setRemind(response.data)
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    
    // useEffect(()=> {
    //     fetchHealthTips()
    // }, [])
    
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
                {data.map((el, index) => (
                <li key={index} className="reminder-item">
                    <span className="reminder-icon">✓</span>
                    {el.title}
                </li>
                ))}
            </ul>
        </div>
    )
}