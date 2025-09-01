import React, { useState } from 'react';
import { Calendar, User, ChevronDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function LaporanPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [openExport, setOpenExport] = useState(false);

    const laporanData = [
        { id: 1, nama: 'Rahmat Fajar Saputra', tanggal: '26-08-2025', jam: '10.00', status: 'Hadir' },
        { id: 2, nama: 'NursyaBani', tanggal: '26-08-2025', jam: '09.58', status: 'Hadir' },
        { id: 3, nama: 'Muhammad Fajri', tanggal: '25-08-2025', jam: '23.59', status: 'Tidak Hadir' },
        { id: 4, nama: 'Asyifa Putri Romansha', tanggal: '25-08-2025', jam: '18.00', status: 'Hadir' },
        { id: 5, nama: 'Hanaviz', tanggal: '25-08-2025', jam: '10.35', status: 'Hadir' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hadir': return 'bg-green-100 text-green-800';
            case 'Tidak Hadir': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
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
                    <p className="text-3xl md:text-4xl font-bold mt-2">Laporan</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center bg-white rounded-full py-2 px-4 shadow-sm cursor-pointer">
                    <User size={20} className="text-gray-600 mr-2" />
                    <span className="font-medium text-gray-700">Admin</span>
                    <ChevronDown size={18} className="ml-2 text-gray-500" />
                </div>
            </header>

            {/* Filter & Export */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex flex-wrap items-end gap-4">
                    {/* Dari Tanggal */}
                    <div className="relative flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Dari Tanggal</label>
                        <input
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                        <Calendar size={18} className="absolute left-3 bottom-2.5 text-gray-400" />
                    </div>
                    {/* Sampai */}
                    <div className="relative flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Sampai</label>
                        <input
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                        <Calendar size={18} className="absolute left-3 bottom-2.5 text-gray-400" />
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm font-medium">
                        Preview
                    </button>
                </div>

                {/* Export Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setOpenExport(!openExport)}
                        className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm font-medium"
                    >
                        <Download size={16} />
                        <span>Export</span>
                        <ChevronDown size={16} />
                    </button>
                    {openExport && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                            <ul className="text-sm">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CSV</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">PDF</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Excel</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Laporan Table */}
            <section className="bg-white rounded-xl p-6 shadow-md">
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
                            {laporanData.map((item) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                        Showing 1-5 of 30 List
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
    );
}
