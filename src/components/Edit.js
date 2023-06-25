import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Image, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import array from './array';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Edit() {

	let history = useNavigate();
	const [show, setShow] = useState(false);
	const [close, setClose] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState();
	const [id, setId] = useState();
	const [namaBarang, setNamaBarang] = useState();
	const [hargaBeli, setHargaBeli] = useState();
	const [hargaJual, setHargaJual] = useState();
	const [stok, setStok] = useState();

	// Getting an index of an entry with an id
	const indexPreviousDataBarang = array.findIndex(item => item.id === id);

	const getBase64 = (file) => {
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
			reader.readAsDataURL(file);
		});
	}

	const handelSubmit = async (e) => {
		e.preventDefault();
		let dataBarang = array[indexPreviousDataBarang];
		if (namaBarang.toLowerCase() !== dataBarang.namaBarang.toLowerCase() && array.findIndex(item => item.namaBarang.toLowerCase() === namaBarang.toLowerCase()) >= 0) {
			handleShow();
			return;
		}

		
		let imageBase64 = null;		
		if (image) {
			if (image[0].size > 100 * 1024) {
				setClose(true);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}
			imageBase64 = await getBase64(image[0]);
		}

		dataBarang.namaBarang = namaBarang;
		dataBarang.hargaBeli = hargaBeli;
		dataBarang.hargaJual = hargaJual;
		dataBarang.stok = stok;
		dataBarang.image = imageBase64 || previewImage;

		// Redirecting to main page
		history('/')
	}

	function saveImage(files) {
		setImage(files)
		setPreviewImage(URL.createObjectURL(files[0]))
	}


	// Useeffect take care that page will
	// be rendered only once
	useEffect(() => {
		setId(localStorage.getItem('id'))
		setNamaBarang(localStorage.getItem('namaBarang'))
		setHargaBeli(localStorage.getItem('hargaBeli'))
		setHargaJual(localStorage.getItem('hargaJual'))
		setStok(localStorage.getItem('stok'))
		setPreviewImage(localStorage.getItem('image'))
	}, [])

	return (
		<div>
			<Form className="d-grid gap-2"
				style={{ margin: '15rem' }}>

				<Alert show={close} variant="danger" onClose={() => setClose(false)} dismissible>
					Ukuran file max 100KB bro.
				</Alert>

				<Image src={previewImage} thumbnail />
				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control onChange=
						{e => saveImage(e.target.files)}
						type="file"
						placeholder="Upload image" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control value={namaBarang} onChange=
						{e => setNamaBarang(e.target.value)}
						type="text"
						placeholder="Masukkan nama barang" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control value={hargaBeli} onChange=
						{e => setHargaBeli(e.target.value)}
						type="number"
						placeholder="Masukkan harga beli" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control value={hargaJual} onChange=
						{e => setHargaJual(e.target.value)}
						type="number"
						placeholder="Masukkan harga jual" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control value={stok} onChange=
						{e => setStok(e.target.value)}
						type="number"
						placeholder="Masukkan stok barang" required />
				</Form.Group>


				{/* Hadinling an onclick event
					running an edit logic */}
				<Button
					onClick={e => handelSubmit(e)}
					variant="primary" type="submit" size="lg">
					Save
				</Button>

				{/* Redirecting to main page after editing */}
				<Link className="d-grid gap-2" to='/'>
					<Button variant="warning"
						size="lg">
						Home
					</Button>
				</Link>
			</Form>

			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data barang [{namaBarang}] sudah ada.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
		</div>
	)
}

export default Edit
