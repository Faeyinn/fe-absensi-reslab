import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Search, User, ChevronDown, UserCheck, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import dataStore from '../data/dataStore';

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dashboardData, setDashboardData] = useState({
        hadir: 0,
        tidakHadir: 0,
        todayHadir: 0,
        todayTidakHadir: 0,
        ringkasan: [],
        chartData: []
    });

    const itemsPerPage = 5;

    useEffect(() => {
        const updateData = () => {
            const stats = dataStore.getAttendanceStats();
            const attendance = dataStore.getAttendance();
            const chartData = dataStore.getChartData();
            
            // Get recent attendance (last 10 records)
            const recentAttendance = attendance
                .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
                .slice(0, 10);

            setDashboardData({
                ...stats,
                ringkasan: recentAttendance,
                chartData
            });
        };

        updateData();
        const unsubscribe = dataStore.subscribe(updateData);
        return unsubscribe;
    }, []);

    // Filter ringkasan berdasarkan search term
    const filteredRingkasan = dashboardData.ringkasan.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggal.includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredRingkasan.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRingkasan = filteredRingkasan.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama saat search
    };

    const getStatusColor = (status) => {
        return status === 'Hadir'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div>
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                            Welcome to Sistem Absensi Reslab, <span className="text-orange-600 font-bold">Admin</span>
                        </h1>
                        <p className="text-3xl md:text-4xl font-bold mt-2">Dashboard</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center bg-white rounded-full py-2 px-4 shadow-sm cursor-pointer">
                        <User size={20} className="text-gray-600 mr-2" />
                        <span className="font-medium text-gray-700">Admin</span>
                        <ChevronDown size={18} className="ml-2 text-gray-500" />
                    </div>
                </header>

                {/* Statistik Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Hadir */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Total Hadir</h3>
                            <UserCheck size={24} className="text-green-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.hadir}</span>
                            <span className="text-sm text-gray-500">total</span>
                        </div>
                    </div>

                    {/* Total Tidak Hadir */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-red-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Total Tidak Hadir</h3>
                            <XCircle size={24} className="text-red-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.tidakHadir}</span>
                            <span className="text-sm text-gray-500">total</span>
                        </div>
                    </div>

                    {/* Hari Ini Hadir */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Hari Ini Hadir</h3>
                            <UserCheck size={24} className="text-blue-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.todayHadir}</span>
                            <span className="text-sm text-gray-500">orang</span>
                        </div>
                    </div>

                    {/* Hari Ini Tidak Hadir */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-yellow-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Hari Ini Tidak Hadir</h3>
                            <XCircle size={24} className="text-yellow-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.todayTidakHadir}</span>
                            <span className="text-sm text-gray-500">orang</span>
                        </div>
                    </div>
                </section>

                {/* Grafik Kehadiran */}
                <section className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Grafik Kehadiran Bulanan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dashboardData.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="linear" 
                                dataKey="Hadir" 
                                stroke="#22c55e" 
                                strokeWidth={3}
                                activeDot={{ r: 6, fill: '#22c55e' }} 
                            />
                            <Line 
                                type="linear" 
                                dataKey="TidakHadir" 
                                stroke="#ef4444" 
                                strokeWidth={3}
                                activeDot={{ r: 6, fill: '#ef4444' }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                {/* Ringkasan Absensi */}
                <section className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Ringkasan Absensi Terbaru</h3>
                        <div className="relative w-full sm:w-auto">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Nama / Tanggal / Status"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                            />
                        </div>
                    </div>
                    
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
                                {currentRingkasan.length > 0 ? (
                                    currentRingkasan.map((item) => (
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
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            Tidak ada data ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-sm text-gray-500">
                                Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} Data
                            </div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} /> Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${index + 1 === currentPage ? 'text-white bg-orange-500 font-semibold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next <ChevronRight size={16} />
                                </button>
                            </nav>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}