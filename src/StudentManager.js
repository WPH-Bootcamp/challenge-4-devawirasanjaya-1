/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor() {
    // Implementasi constructor di sini
    this.students = []; // array of Student
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    // Implementasi method di sini
    // ID unik
    const exists = this.students.some(s => s.id === String(student.id));
    if (exists) return false;
    this.students.push(student);
    return true;
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    // Implementasi method di sini
    const idx = this.students.findIndex(s => s.id === String(id));
    if (idx === -1) return false;
    this.students.splice(idx, 1);
    return true;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    // Implementasi method di sini
    return this.students.find(s => s.id === String(id)) || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    // Implementasi method di sini
    const s = this.findStudent(id);
    if (!s) return false;
    // data yang boleh di-update: name, class
    if (data.name !== undefined) {
      if (!data.name || !String(data.name).trim()) return false;
      s.name = String(data.name).trim();
    }
    if (data.className !== undefined) {
      if (!data.class || !String(data.className).trim()) return false;
      s.class = String(data.className).trim();
    }
    return true;
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    // Implementasi method di sini
    return [...this.students];
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    // Implementasi method di sini
    const count = Number(n) || 0;
    return [...this.students]
      .sort((a, b) => b.getAverage() - a.getAverage())
      .slice(0, count);
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    // Implementasi method di sini
    if (this.students.length === 0) {
      console.log('(Belum ada data siswa)');
      return;
    }
    this.students.forEach((s, i) => {
      console.log(`\n#${i + 1}`);
      s.displayInfo();
      console.log('------------------------');
    });
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    // Implementasi method di sini (BONUS)
    const key = String(className || '').trim();
    if (!key) return [];
    return this.students.filter(s => s.class === key);
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    // Implementasi method di sini (BONUS)
    const group = this.getStudentsByClass(className);
    const count = group.length;
    const avgClass =
      count === 0
        ? 0
        : Number(
            (group.reduce((acc, s) => acc + s.getAverage(), 0) / count).toFixed(2)
          );
    const lulus = group.filter(s => s.getGradeStatus() === 'Lulus').length;
    return { className, count, avgClass, lulus, tidakLulus: count - lulus };
  }
}

export default StudentManager;
