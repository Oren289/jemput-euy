CREATE TABLE pengguna (
   id_pengguna uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
   username_pengguna VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(50) NOT NULL,
   nama_depan_pengguna VARCHAR(255) NOT NULL,
   nama_belakang_pengguna VARCHAR(255),
   email_pengguna VARCHAR(255) NOT NULL UNIQUE,
   no_hp_pengguna VARCHAR(20) NOT NULL UNIQUE,
   alamat_pengguna TEXT,
   role VARCHAR(7) NOT NULL,
   status VARCHAR(20) NOT NULL
);

-- CREATE TABLE admin (
--    username_admin VARCHAR(50) NOT NULL PRIMARY KEY,
--    password VARCHAR(50) NOT NULL,
--    nama_depan_admin VARCHAR(255) NOT NULL,
--    nama_belakang_admin VARCHAR(255),
--    email_admin VARCHAR(255) NOT NULL
-- )

-- CREATE TABLE petugas (
--    id_petugas VARCHAR(50) NOT NULL PRIMARY KEY,
--    username_petugas VARCHAR(50) NOT NULL UNIQUE,
--    password VARCHAR(50) NOT NULL,
--    nama_depan_petugas VARCHAR(255) NOT NULL,
--    nama_belakang_petugas VARCHAR(255),
--    email_petugas VARCHAR(255) NOT NULL,
--    no_hp_petugas VARCHAR(20) NOT NULL,
--    role VARCHAR(7) NOT NULL,
--    status VARCHAR(20) NOT NULL
-- )

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
   status_layanan VARCHAR(20) NOT NULL DEFAULT 'Menunggu proses review',
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
   id_alamat uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
   username_pengguna VARCHAR(50) NOT NULL REFERENCES pengguna(username_pengguna),
   kecamatan VARCHAR(50),
   kelurahan VARCHAR(50),
   keterangan_alamat TEXT
);

CREATE VIEW antrean_jemput AS SELECT
   urutan,
   id_permintaan,
   tanggal_diterima,
   nama_pemohon,
   no_hp_pemohon,
   alamat_kecamatan,
   alamat_kelurahan,
   alamat_ket_tambahan,
   jumlah_sampah,
   keterangan_tambahan,
   status_layanan,
   username_petugas
FROM permintaan_layanan 
WHERE status_layanan = 'Menunggu penjemputan' OR status_layanan = 'Sedang dijemput'
ORDER BY urutan
LIMIT 10;


INSERT INTO pengguna (username_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, email_pengguna, no_hp_pengguna, alamat_pengguna)
VALUES ('ilhan', 'ilhan123' , 'Ilhan', 'Mahardika', 'ilhanmahardikap@gmail.com', '085219850202', 'Jl. Ciparay No.3');

INSERT INTO petugas (id_petugas, username_petugas, password, nama_depan_petugas, nama_belakang_petugas, email_petugas, no_hp_petugas, role, status )
VALUES ('ADMIN1', 'admin1', 'generalpw', 'Johhny', 'Depp', 'adminganteng@gmail.com', '085219850202', 'admin', 'aktif');