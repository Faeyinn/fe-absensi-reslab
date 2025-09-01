import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Search, User, ChevronDown, UserCheck, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const chartData = [
    { name: 'Jan', Hadir: 45, TidakHadir: 15 },
    { name: 'Feb', Hadir: 50, TidakHadir: 20 },
    { name: 'Mar', Hadir: 30, TidakHadir: 25 },
    { name: 'Apr', Hadir: 22, TidakHadir: 28 },
    { name: 'Mei', Hadir: 48, TidakHadir: 30 },
];

const dashboardData = {
    hadir: 43,
    tidakHadir: 12,
    ringkasan: [
        { nama: 'Rahmat Fajar Saputra', tanggal: '26-08-2025', jam: '10.00', status: 'Hadir' },
        { nama: 'NursyaBani', tanggal: '26-08-2025', jam: '09.58', status: 'Hadir' },
        { nama: 'Muhammad Fajri', tanggal: '25-08-2025', jam: '23.59', status: 'Tidak Hadir' },
        { nama: 'Asyifa Putri Romansha', tanggal: '25-08-2025', jam: '18.00', status: 'Tidak Hadir' },
        { nama: 'Hanaviz', tanggal: '25-08-2025', jam: '10.35', status: 'Hadir' },
    ]
};

export default function Dashboard() {
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
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {/* Hadir Card */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Hadir</h3>
                            <UserCheck size={24} className="text-green-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.hadir}</span>
                            <span className="text-sm text-gray-500">orang</span>
                        </div>
                    </div>
                    {/* Tidak Hadir Card */}
                    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-red-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-500">Tidak Hadir</h3>
                            <XCircle size={24} className="text-red-500" />
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-gray-800">{dashboardData.tidakHadir}</span>
                            <span className="text-sm text-gray-500">orang</span>
                        </div>
                    </div>
                </section>

                {/* Grafik Kehadiran */}
                <section className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Grafik Kehadiran Bulanan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="linear" dataKey="Hadir" stroke="#22c55e" activeDot={{ r: 8 }} />
                            <Line type="linear" dataKey="TidakHadir" stroke="#ef4444" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                {/* Ringkasan Absensi */}
                <section className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Ringkasan Absensi Hari Ini</h3>
                        <div className="relative w-full sm:w-auto">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Nama / Tanggal / Status"
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
                                {dashboardData.ringkasan.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jam}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`py-1 px-3 rounded-full text-xs font-semibold
                        ${item.status === 'Hadir' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                            Showing 1-5 of 10 List
                        </div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <ChevronLeft size={16} /> Prev
                            </a>
                            <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold text-white bg-orange-500">
                                1
                            </a>
                            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                2
                            </a>
                            <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                ...
                            </a>
                            <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                5
                            </a>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Next <ChevronRight size={16} />
                            </a>
                        </nav>
                    </div>
                </section>
            </main>
        </div>
    );
}
