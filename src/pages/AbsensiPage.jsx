import React, { useState } from 'react';
import { Search, User, ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function AbsensiPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0); // index tanggal yang dipilih

    // Dummy data
    const attendanceData = [
        { id: 1, nama: 'Rahmat Fajar Saputra', tanggal: '26-08-2025', jam: '10.00', status: 'Hadir' },
        { id: 2, nama: 'NursyaBani', tanggal: '26-08-2025', jam: '09.58', status: 'Hadir' },
        { id: 3, nama: 'Muhammad Fajri', tanggal: '25-08-2025', jam: '-', status: 'Tidak Hadir' },
        { id: 4, nama: 'Asyifa Putri Romansha', tanggal: '25-08-2025', jam: '10.05', status: 'Hadir' },
        { id: 5, nama: 'Hanaviz', tanggal: '24-08-2025', jam: '-', status: 'Tidak Hadir' },
    ];

    // Ambil daftar tanggal unik untuk pagination per hari
    const uniqueDates = [...new Set(attendanceData.map(item => item.tanggal))];

    // Tentukan tanggal aktif (kalau belum pilih dari filter, pakai currentPage)
    const activeDate = selectedDate || uniqueDates[currentPage];

    // Filter data sesuai tanggal + search
    const filteredAttendance = attendanceData.filter(item =>
        item.tanggal === activeDate &&
        (
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tanggal.includes(searchTerm) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const getStatusColor = (status) => {
        return status === 'Hadir'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    // Ganti halaman (tanggal)
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setSelectedDate('');
        }
    };

    const handleNext = () => {
        if (currentPage < uniqueDates.length - 1) {
            setCurrentPage(currentPage + 1);
            setSelectedDate('');
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        Welcome to Sistem Absensi Reslab, <span className="text-orange-600 font-bold">Admin</span>
                    </h1>
                    <p className="text-3xl md:text-4xl font-bold mt-2">Absensi</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center bg-white rounded-full py-2 px-4 shadow-sm cursor-pointer">
                    <User size={20} className="text-gray-600 mr-2" />
                    <span className="font-medium text-gray-700">Admin</span>
                    <ChevronDown size={18} className="ml-2 text-gray-500" />
                </div>
            </header>

            {/* Search + Filter Tanggal */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-auto">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari Nama / Tanggal / Status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                    />
                </div>

                {/* Filter Tanggal */}
                <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value.split('-').reverse().join('-'))} // format ke dd-mm-yyyy
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                    />
                </div>
            </div>

            {/* Attendance Table */}
            <section className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Daftar Kehadiran - {activeDate}
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Jam</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAttendance.length > 0 ? (
                                filteredAttendance.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jam}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        Tidak ada data kehadiran
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination per Tanggal */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                        Tanggal {currentPage + 1} dari {uniqueDates.length}
                    </div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        {uniqueDates.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => { setCurrentPage(index); setSelectedDate(''); }}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${index === currentPage ? 'text-white bg-orange-500 font-semibold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {date}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === uniqueDates.length - 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </nav>
                </div>
            </section>
        </main>
    );
}
