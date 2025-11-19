/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor({id, name, className}) {
    // Implementasi constructor di sini
    if (id === undefined || id === null) throw new Error('ID wajib diisi');
    if (!name || !name.trim()) throw new Error('Nama wajib diisi');
    if (!className || !className.trim()) throw new Error('Kelas wajib diisi');

    this.id = String(id);
    this.name = name.trim();
    // gunakan properti "class" sesuai ketentuan challenge
    this.class = className.trim();
    this.grades = {}; // { subject: score }
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Implementasi method di sini
    const subj = String(subject || '').trim();
    const val = Number(score);
    if (!subj) throw new Error('Mata pelajaran wajib diisi');
    if (!Number.isFinite(val) || val < 0 || val > 100) {
      throw new Error('Nilai harus angka 0–100');
    }
    this.grades[subj] = val;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    // Implementasi method di sini
    const vals = Object.values(this.grades);
    if (vals.length === 0) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Number((sum / vals.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    // Implementasi method di sini
    return this.getAverage() >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    // Implementasi method di sini
    console.log(`ID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.class}`);
    console.log('Mata Pelajaran:');
    const entries = Object.entries(this.grades);
    if (entries.length === 0) {
      console.log('  (belum ada nilai)');
    } else {
      for (const [subj, val] of entries) {
        console.log(`  - ${subj}: ${val}`);
      }
    }
    console.log(`Rata-rata: ${this.getAverage()}`);
    console.log(`Status: ${this.getGradeStatus()}`);
  }
}

export default Student;
