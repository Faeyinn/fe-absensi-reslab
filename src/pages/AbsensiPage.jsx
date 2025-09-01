import React, { useState, useEffect } from 'react';
import { Search, User, ChevronDown, ChevronLeft, ChevronRight, Filter, Calendar, RotateCcw } from 'lucide-react';
import dataStore from '../data/dataStore';

export default function AbsensiPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [attendanceData, setAttendanceData] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showFilter, setShowFilter] = useState(false);

    const itemsPerPage = 8;

    useEffect(() => {
        const updateAttendance = () => {
            setAttendanceData(dataStore.getAttendance());
        };

        updateAttendance();
        const unsubscribe = dataStore.subscribe(updateAttendance);
        return unsubscribe;
    }, []);

    // Filter data berdasarkan search term, tanggal, dan status
    const filteredAttendance = attendanceData.filter(item => {
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tanggal.includes(searchTerm) ||
                            item.status.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDate = !filterDate || item.tanggal === filterDate;
        const matchesStatus = !filterStatus || item.status === filterStatus;
        
        return matchesSearch && matchesDate && matchesStatus;
    });

    const totalItems = filteredAttendance.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAttendance = filteredAttendance.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status) => {
        return status === 'Hadir'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (type, value) => {
        if (type === 'date') {
            setFilterDate(value);
        } else if (type === 'status') {
            setFilterStatus(value);
        }
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setFilterDate('');
        setFilterStatus('');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm || filterDate || filterStatus;

    // Get unique dates and sort them
    const availableDates = [...new Set(attendanceData.map(item => item.tanggal))]
        .sort((a, b) => new Date(b) - new Date(a));

    // Statistics
    const stats = {
        total: filteredAttendance.length,
        hadir: filteredAttendance.filter(item => item.status === 'Hadir').length,
        tidakHadir: filteredAttendance.filter(item => item.status === 'Tidak Hadir').length
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

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    {/* Search */}
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

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                            hasActiveFilters 
                                ? 'bg-orange-100 border-orange-300 text-orange-700' 
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Filter size={16} />
                        <span>Filter</span>
                        {hasActiveFilters && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                {[searchTerm, filterDate, filterStatus].filter(Boolean).length}
                            </span>
                        )}
                    </button>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                            <RotateCcw size={16} />
                            <span>Reset</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Panel */}
            {showFilter && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Date Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Tanggal</label>
                            <select
                                value={filterDate}
                                onChange={(e) => handleFilterChange('date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                            >
                                <option value="">Semua Tanggal</option>
                                {availableDates.map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                            >
                                <option value="">Semua Status</option>
                                <option value="Hadir">Hadir</option>
                                <option value="Tidak Hadir">Tidak Hadir</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                    <h4 className="text-sm font-medium text-gray-600">Total Records</h4>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                    <h4 className="text-sm font-medium text-gray-600">Hadir</h4>
                    <p className="text-2xl font-bold text-green-600">{stats.hadir}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500">
                    <h4 className="text-sm font-medium text-gray-600">Tidak Hadir</h4>
                    <p className="text-2xl font-bold text-red-600">{stats.tidakHadir}</p>
                </div>
            </section>

            {/* Attendance Table */}
            <section className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Daftar Kehadiran
                    </h3>
                    {hasActiveFilters && (
                        <div className="text-sm text-gray-500">
                            {filteredAttendance.length} dari {attendanceData.length} records
                        </div>
                    )}
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Jam</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentAttendance.length > 0 ? (
                                currentAttendance.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.jam === '-' ? (
                                                <span className="text-gray-400 italic">-</span>
                                            ) : (
                                                <span className="font-mono">{item.jam}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        {hasActiveFilters ? (
                                            <div>
                                                <p className="mb-2">Tidak ada data yang cocok dengan filter</p>
                                                <button
                                                    onClick={clearAllFilters}
                                                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                                >
                                                    Reset Filter
                                                </button>
                                            </div>
                                        ) : (
                                            'Tidak ada data kehadiran'
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        <div className="text-sm text-gray-500">
                            Menampilkan {startIndex + 1} sampai {Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} Data
                        </div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                                <span className="ml-1">Prev</span>
                            </button>
                            
                            {/* Page Numbers */}
                            {totalPages <= 7 ? (
                                // Show all pages if 7 or fewer
                                Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                            index + 1 === currentPage 
                                                ? 'text-white bg-orange-500 font-semibold' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            ) : (
                                // Show condensed pagination for more than 7 pages
                                <>
                                    {currentPage > 3 && (
                                        <>
                                            <button
                                                onClick={() => goToPage(1)}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                1
                                            </button>
                                            {currentPage > 4 && (
                                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                    ...
                                                </span>
                                            )}
                                        </>
                                    )}
                                    
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                                        let pageNum;
                                        if (currentPage <= 3) {
                                            pageNum = index + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + index;
                                        } else {
                                            pageNum = currentPage - 2 + index;
                                        }
                                        
                                        if (pageNum < 1 || pageNum > totalPages) return null;
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => goToPage(pageNum)}
                                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                                    pageNum === currentPage 
                                                        ? 'text-white bg-orange-500 font-semibold' 
                                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    
                                    {currentPage < totalPages - 2 && (
                                        <>
                                            {currentPage < totalPages - 3 && (
                                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                    ...
                                                </span>
                                            )}
                                            <button
                                                onClick={() => goToPage(totalPages)}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                            
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="mr-1">Next</span>
                                <ChevronRight size={16} />
                            </button>
                        </nav>
                    </div>
                )}
            </section>
        </main>
    );
}