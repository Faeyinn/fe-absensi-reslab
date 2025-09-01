import React, { useState } from 'react';
import { Calendar, User, ChevronDown, ChevronLeft, ChevronRight, Download, X } from 'lucide-react';

export default function LaporanPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openExport, setOpenExport] = useState(false);

    const laporanData = [
        { id: 1, nama: 'Rahmat Fajar Saputra', tanggal: '2025-08-26', jam: '10.00', status: 'Hadir' },
        { id: 2, nama: 'NursyaBani', tanggal: '2025-08-26', jam: '09.58', status: 'Hadir' },
        { id: 3, nama: 'Muhammad Fajri', tanggal: '2025-08-25', jam: '-', status: 'Tidak Hadir' },
        { id: 4, nama: 'Asyifa Putri Romansha', tanggal: '2025-08-25', jam: '10.05', status: 'Hadir' },
        { id: 5, nama: 'Hanaviz', tanggal: '2025-08-24', jam: '-', status: 'Tidak Hadir' },
        { id: 6, nama: 'Bunga Jacinda', tanggal: '2025-08-26', jam: '08.30', status: 'Hadir' },
        { id: 7, nama: 'Muhammad Hafiz', tanggal: '2025-08-25', jam: '09.15', status: 'Hadir' },
        { id: 8, nama: 'Naufal Rafiif Irwan', tanggal: '2025-08-24', jam: '-', status: 'Tidak Hadir' },
        { id: 9, nama: 'Daffa', tanggal: '2025-08-26', jam: '11.00', status: 'Hadir' },
        { id: 10, nama: 'Widia', tanggal: '2025-08-25', jam: '14.20', status: 'Hadir' },
    ];

    const [filteredData, setFilteredData] = useState(laporanData);

    const itemsPerPage = 5;
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePreview = () => {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const newFilteredData = laporanData.filter(item => {
            const itemDate = new Date(item.tanggal);
            return (!start || itemDate >= start) && (!end || itemDate <= end);
        });

        setFilteredData(newFilteredData);
        setCurrentPage(1);
    };

    const handleClearFilter = () => {
        setStartDate('');
        setEndDate('');
        setFilteredData(laporanData);
        setCurrentPage(1);
    };

    const handleExport = (format) => {
        if (filteredData.length === 0) {
            alert("Tidak ada data untuk diexport.");
            return;
        }

        if (format === 'CSV') {
            const headers = ["Nama", "Tanggal", "Jam", "Status"];
            const rows = filteredData.map(item => [item.nama, item.tanggal, item.jam, item.status]);

            let csvContent = "data:text/csv;charset=utf-8,"
                + [headers, ...rows].map(e => e.join(",")).join("\n");

            const link = document.createElement("a");
            link.href = encodeURI(csvContent);
            link.download = "laporan.csv";
            link.click();
        }

        if (format === 'Excel') {
            // Note: XLSX library not available in this environment
            alert("Excel export tidak tersedia dalam environment ini");
        }

        if (format === 'PDF') {
            // Note: jsPDF library not available in this environment
            alert("PDF export tidak tersedia dalam environment ini");
        }

        setOpenExport(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hadir': return 'bg-green-100 text-green-800';
            case 'Tidak Hadir': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Check if any filter is active
    const hasActiveFilter = startDate || endDate;

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
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                        <Calendar size={18} className="absolute left-3 bottom-2.5 text-gray-400" />
                    </div>
                    {/* Sampai */}
                    <div className="relative flex flex-col">
                        <label className="text-xs font-medium text-gray-600 mb-1">Sampai</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                        <Calendar size={18} className="absolute left-3 bottom-2.5 text-gray-400" />
                    </div>
                    <button
                        onClick={handlePreview}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm font-medium">
                        Preview
                    </button>
                    {/* Clear Filter Button */}
                    {hasActiveFilter && (
                        <button
                            onClick={handleClearFilter}
                            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm font-medium"
                        >
                            <X size={16} />
                            <span>Clear Filter</span>
                        </button>
                    )}
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
                                <li onClick={() => handleExport('CSV')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CSV</li>
                                <li onClick={() => handleExport('PDF')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">PDF</li>
                                <li onClick={() => handleExport('Excel')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Excel</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Filter Indicator */}
            {hasActiveFilter && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-blue-800">
                            <span className="font-medium">Filter aktif:</span>
                            {startDate && <span className="ml-2">Dari: {startDate}</span>}
                            {endDate && <span className="ml-2">Sampai: {endDate}</span>}
                        </div>
                        <button
                            onClick={handleClearFilter}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Hapus Filter
                        </button>
                    </div>
                </div>
            )}

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
                            {currentData.length > 0 ? (
                                currentData.map((item) => (
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
                                        Tidak ada data laporan ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                        Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} Data
                    </div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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