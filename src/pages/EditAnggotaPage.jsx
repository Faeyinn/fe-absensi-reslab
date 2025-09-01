import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, ChevronDown, Scan, X } from 'lucide-react';
import { members as dummyMembers } from '../data/dummyMembers'; // Mengimpor data dummy

export default function EditAnggota() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
        idRfid: ''
    });

    useEffect(() => {
        const memberToEdit = dummyMembers.find(member => member.id === parseInt(id));
        if (memberToEdit) {
            setFormData(memberToEdit);
        } else {
            console.error("Member not found!");
            navigate('/anggota'); // Arahkan kembali jika anggota tidak ditemukan
        }
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleScan = () => {
        console.log('Scanning RFID...');
        setFormData(prev => ({
            ...prev,
            idRfid: 'RF' + Math.random().toString(36).substr(2, 6).toUpperCase()
        }));
    };

    const handleCancel = () => {
        setFormData({ nama: '', nim: '', idRfid: '' });
        navigate('/anggota');
    };

    const handleSave = () => {
        if (!formData.nama || !formData.nim || !formData.idRfid) {
            alert('Mohon lengkapi semua field');
            return;
        }
        console.log('Saving member:', formData);
        navigate('/anggota'); // Arahkan kembali ke halaman anggota setelah simpan
    };

    return (
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        Welcome to Sistem Absensi Reslab, <span className="text-orange-600 font-bold">Admin</span>
                    </h1>
                    <p className="text-3xl md:text-4xl font-bold mt-2">Edit Anggota</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center bg-white rounded-full py-2 px-4 shadow-sm cursor-pointer">
                    <User size={20} className="text-gray-600 mr-2" />
                    <span className="font-medium text-gray-700">Admin</span>
                    <ChevronDown size={18} className="ml-2 text-gray-500" />
                </div>
            </header>

            {/* Form Card */}
            <section className="bg-white rounded-xl p-6 shadow-md max-w-2xl w-full mx-auto">
                <div className="space-y-6">
                    {/* Nama */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-gray-700 font-medium w-24 flex-shrink-0">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            placeholder="Masukkan nama"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                    </div>

                    {/* NIM */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-gray-700 font-medium w-24 flex-shrink-0">
                            NIM
                        </label>
                        <input
                            type="text"
                            name="nim"
                            value={formData.nim}
                            onChange={handleInputChange}
                            placeholder="Masukkan NIM"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                        />
                    </div>

                    {/* RFID */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-gray-700 font-medium w-24 flex-shrink-0">
                            ID RFID
                        </label>
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                name="idRfid"
                                value={formData.idRfid}
                                onChange={handleInputChange}
                                placeholder="Scan atau input ID RFID"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                            />
                            <button
                                onClick={handleScan}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors font-medium text-sm"
                            >
                                <Scan className="w-4 h-4" />
                                <span>Scan</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={handleCancel}
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors font-medium"
                    >
                        <X className="w-4 h-4" />
                        <span>Batal</span>
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                    >
                        Simpan
                    </button>
                </div>
            </section>
        </main>
    );
}