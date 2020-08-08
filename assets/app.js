// Class Barang

class Barang {
    constructor(NamaBarang, HargaBarang, SatuanBarang, JumlahBarang) {
        this.NamaBarang   = NamaBarang;
        this.HargaBarang  = HargaBarang;
        this.SatuanBarang = SatuanBarang;
        this.JumlahBarang = JumlahBarang;
    }
}

// UI Class

class UI {
    static V_Barang() { // Display Books
        const DataBarang = Penyimpanan.AmbilBarang();
        // const DataBarang = [];
        const D_Barang = DataBarang; // books

        D_Barang.forEach((barang) => UI.addBarangToList(barang));
    }

    static addBarangToList(barang) {
        const list = document.querySelector('#list-barang');
        const row = document.createElement('tr');
        row.innerHTML = `            
            <td>${barang.NamaBarang}</td>
            <td>Rp. ${barang.HargaBarang}</td>
            <td>${barang.JumlahBarang } ${barang.SatuanBarang} </td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);

    }

    static ClearField() {
        document.querySelector('#NamaBarang').value ='';
        document.querySelector('#HargaBarang').value = '';
        document.querySelector('#SatuanBarang').value = '0';
        document.querySelector('#JumlahBarang').value = '';
    }

    static deleteBarang(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static PesanNotifikasi(pesan, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(pesan));
        const container = document.querySelector('.container');
        const form = document.querySelector('#form-barang')
        container.insertBefore(div, form);

        // Waktu Vanish
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Penyimpanan Data

class Penyimpanan {
    static AmbilBarang() {
        let barangs;
        if(localStorage.getItem('barangs') === null) {
            barangs = [];
        } else {
            barangs = JSON.parse(localStorage.getItem('barangs'));
        }

        return barangs;
    }

    static TambahBarang(barang) {
        const barangs = Penyimpanan.AmbilBarang();
        barangs.push(barang);
        localStorage.setItem('barangs', JSON.stringify(barangs));
    }

    static HapusBarang(NamaBarang) {
        const barangs = Penyimpanan.AmbilBarang();

        barangs.forEach((barang, index) => {
            if(barang.NamaBarang = NamaBarang) {
                barangs.splice(index, 1);
            }
        });

        localStorage.setItem('barangs', JSON.stringify(barangs));    
    }
}

// Event Tabel Barang

document.addEventListener('DOMContentLoaded', UI.V_Barang);

// Event Tambah Barang

document.querySelector('#form-barang').addEventListener('submit', (e) => {
    // Prevent Submit
    e.preventDefault();

    // Ambil Value Di Form
    const Nama      = document.querySelector('#NamaBarang').value;
    const Harga     = document.querySelector('#HargaBarang').value;
    const Satuan    = document.querySelector('#SatuanBarang').value;
    const Jumlah    = document.querySelector('#JumlahBarang').value;

    // Validasi
    if(Nama === '' || Harga === '' || Satuan === 0 || Jumlah === '') {
        UI.PesanNotifikasi('Tolong isi form dengan benar !!!', 'danger')
    } else {
        // Instatiate Barang
        const barang = new Barang(Nama, Harga, Satuan, Jumlah);
        // console.log(barang);

        // Tambah Barang ke UI
        UI.addBarangToList(barang);

        // Tambah Barang ke Local Storage
        Penyimpanan.TambahBarang(barang);

        // Alert Sukses
        UI.PesanNotifikasi('Berhasil Menambahkan Data Barang', 'success');

        // Hapus Form
        UI.ClearField();    
    }
});

// Event Hapus Barang
document.querySelector('#list-barang').addEventListener('click', (e) => {
    UI.deleteBarang(e.target);

    // Hapus Barang di Local Storage
    Penyimpanan.HapusBarang(e.target.parentElement.previousElementSibling.textContent);

    // Alert Berhasil Menghapus
    UI.PesanNotifikasi('Berhasil Mengapus Data Barang', 'success');
});