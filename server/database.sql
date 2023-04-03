CREATE TABLE pengguna (
   id_pengguna uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
   username_pengguna VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(50) NOT NULL,
   nama_depan_pengguna VARCHAR(255) NOT NULL,
   nama_belakang_pengguna VARCHAR(255),
   email_pengguna VARCHAR(255) NOT NULL UNIQUE,
   no_hp_pengguna VARCHAR(20) NOT NULL UNIQUE,
   alamat_pengguna TEXT
)

CREATE TABLE admin (
   username_admin VARCHAR(50) NOT NULL PRIMARY KEY,
   password VARCHAR(50) NOT NULL,
   nama_depan_admin VARCHAR(255) NOT NULL,
   nama_belakang_admin VARCHAR(255),
   email_admin VARCHAR(255) NOT NULL
)

CREATE TABLE petugas (
   username_petugas VARCHAR(50) NOT NULL PRIMARY KEY,
   password VARCHAR(50) NOT NULL,
   nama_depan_petugas VARCHAR(255) NOT NULL,
   nama_belakang_petugas VARCHAR(255),
   email_petugas VARCHAR(255) NOT NULL,
   no_hp_petugas VARCHAR(20) NOT NULL,
   status VARCHAR(20) NOT NULL
)

CREATE TABLE permintaan_layanan (
   urutan BIGSERIAL NOT NULL,
   id_permintaan uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
   tanggal_diterima DATE NOT NULL DEFAULT CURRENT_DATE,
   username_pengguna VARCHAR(50) NOT NULL REFERENCES pengguna(username_pengguna),
   nama_pemohon VARCHAR(255) NOT NULL,
   no_hp_pemohon VARCHAR(20) NOT NULL,
   alamat_kecamatan VARCHAR(50) NOT NULL,
   alamat_kelurahan VARCHAR(50) NOT NULL,
   alamat_ket_tambahan TEXT NOT NULL,
   jumlah_sampah INTEGER NOT NULL,
   keterangan_tambahan TEXT NOT NULL,
   status_layanan VARCHAR(20) NOT NULL DEFAULT 'belum selesai',
   tanggal_selesai DATE,
   username_petugas VARCHAR(50) REFERENCES petugas(username_petugas)
);

CREATE TABLE jenis_sampah (
   id_permintaan uuid NOT NULL REFERENCES permintaan_layanan(id_permintaan),
   sampah VARCHAR(50) NOT NULL
);

CREATE TABLE data_aduan (
   id_aduan uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
   tanggal_aduan DATE NOT NULL DEFAULT CURRENT_DATE,
   nama_pelapor VARCHAR(255) NOT NULL,
   nomor_kontak VARCHAR(20) NOT NULL,
   deskripsi TEXT NOT NULL,
   foto_aduan TEXT,
   jenis_aduan VARCHAR(50) NOT NULL
);

CREATE TABLE alamat (
   username_pengguna VARCHAR(50) NOT NULL PRIMARY KEY REFERENCES pengguna(username_pengguna),
   kecamatan VARCHAR(50),
   kelurahan VARCHAR(50),
   keterangan_alamat TEXT
);

INSERT INTO pengguna (username_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, email_pengguna, no_hp_pengguna, alamat_pengguna)
VALUES ('ilhan', 'ilhan123' , 'Ilhan', 'Mahardika', 'ilhanmahardikap@gmail.com', '085219850202', 'Jl. Ciparay No.3');

INSERT INTO admin (username_admin, password, nama_depan_admin, nama_belakang_admin, email_admin)
VALUES ('admin', 'admin123', 'Johhny', 'Depp', 'adminganteng@gmail.com');

ALTER TABLE permintaan_layanan ALTER status_layanan SET DEFAULT 'Menunggu proses review';