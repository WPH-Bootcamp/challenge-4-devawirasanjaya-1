/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('ID: ').trim();
  const name = readlineSync.question('Nama: ').trim();
  const className = readlineSync.question('Kelas (mis. 10A): ').trim();

  try {
    // Sesuaikan dengan constructor Student yang kamu buat
    const student = new Student({ id, name, className });

    // addStudent bisa saja melempar error kalau ID duplikat
    manager.addStudent(student);

    console.log('✅ Siswa berhasil ditambahkan.');
  } catch (err) {
    console.error('❌ Gagal menambah siswa:', err.message);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini
  console.log('\n--- Daftar Semua Siswa ---');
  // TODO: Lengkapi implementasi
  const all = manager.getAllStudents();
  if (!all || all.length === 0) {
    console.log('(Belum ada data siswa)');
    return;
  }

  // Jika StudentManager kamu punya displayAllStudents()
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini
  console.log('\n--- Cari Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID: ').trim();

  const student = manager.findStudent(id);
  if (!student) {
    console.error('❌ Siswa dengan ID tersebut tidak ditemukan.');
    return;
  }

  student.displayInfo();
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  // Implementasi di sini
  console.log('\n--- Update Data Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ').trim();

  const student = manager.findStudent(id);
  if (!student) {
    console.error('❌ Siswa tidak ditemukan.');
    return;
  }

  console.log('\nData saat ini:');
  student.displayInfo();

  const newName = readlineSync.question('\nNama baru (kosong = tidak diubah): ');
  const newClass = readlineSync.question('Kelas baru (kosong = tidak diubah): ');

  const dataUpdate = {};
  if (newName.trim()) dataUpdate.name = newName;
  if (newClass.trim()) dataUpdate.className = newClass; // atau "class" jika di StudentManager kamu pakainya "class"

  if (Object.keys(dataUpdate).length === 0) {
    console.log('Tidak ada perubahan data.');
    return;
  }

  try {
    manager.updateStudent(id, dataUpdate);
    console.log('✅ Data siswa berhasil diupdate.');
  } catch (err) {
    console.error('❌ Gagal update siswa:', err.message);
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  // Implementasi di sini
  console.log('\n--- Hapus Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa yang akan dihapus: ').trim();

  const student = manager.findStudent(id);
  if (!student) {
    console.error('❌ Siswa tidak ditemukan.');
    return;
  }

  console.log('\nData siswa yang akan dihapus:');
  student.displayInfo();

  const confirm = readlineSync.question('\nYakin hapus siswa ini? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('Penghapusan dibatalkan.');
    return;
  }

  try {
    manager.removeStudent(id);
    console.log('✅ Siswa berhasil dihapus.');
  } catch (err) {
    console.error('❌ Gagal menghapus siswa:', err.message);
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');
  // TODO: Lengkapi implementasi
  const id = readlineSync.question('Masukkan ID siswa: ').trim();

  const student = manager.findStudent(id);
  if (!student) {
    console.error('❌ Siswa tidak ditemukan.');
    return;
  }

  console.log('\nData siswa:');
  student.displayInfo();

  const subject = readlineSync.question('\nMata pelajaran: ').trim();
  const scoreInput = readlineSync.question('Nilai (0-100): ').trim();

  try {
    student.addGrade(subject, scoreInput);
    console.log('✅ Nilai berhasil ditambahkan.');
  } catch (err) {
    console.error('❌ Gagal menambah nilai:', err.message);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');
  // TODO: Lengkapi implementasi
  const topStudents = manager.getTopStudents(3);
  if (!topStudents || topStudents.length === 0) {
    console.log('(Belum ada data siswa)');
    return;
  }

  topStudents.forEach((student, index) => {
    console.log(`\nPeringkat #${index + 1}`);
    student.displayInfo();
    console.log('------------------------');
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  // TODO: Implementasikan loop utama program
  let running = true;
  
  while (running) {
    // Tampilkan menu
    // Baca pilihan user
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    
    // Hint: gunakan switch-case untuk handle berbagai pilihan
    displayMenu();
    const choice = readlineSync.question('Pilih menu (1-8): ').trim();

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('Pilihan tidak valid. Silakan coba lagi.');
        break;
  }
}
  
  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
