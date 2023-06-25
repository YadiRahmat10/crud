import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Image, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import array from './array';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

function Create() {

	const [show, setShow] = useState(false);
	const [close, setClose] = useState(false);
 	 const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	const [namaBarang, setNamaBarang] = useState('undefined');
	const [hargaBeli, setHargaBeli] = useState(0);
	const [hargaJual, setHargaJual] = useState(0);
	const [stok, setStok] = useState(0);
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState();

	let history = useNavigate();

	const getBase64 = (file) => {
		return new Promise((resolve,reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
			reader.readAsDataURL(file);
		});
	}

	// Function for creating a post/entry
	const handelSubmit = async (e) => {
		e.preventDefault(); // Prevent reload

		setClose(false);
		let imageBase64 = null;		
		if (image) {
			if (image[0].size > 100 * 1024) {
				setClose(true);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}
			imageBase64 = await getBase64(image[0]);
		}

		// cari barang berdasarkan nama di database, jika barang tersebut sudah ada maka data tersebut tidak akan disimpan di database
		if (array.findIndex(item => item.namaBarang.toLowerCase() === namaBarang.toLowerCase()) >= 0) {
			handleShow();
			return;
		}

		const ids = uuid() // Creating unique id
		let uni = ids.slice(0, 8) // Slicing unique id

		// Fetching a value from usestate and
		// pushing to javascript object
		const newData = {
			id:uni,
			namaBarang,
			hargaBeli,
			hargaJual,
			stok,
			image: imageBase64
		};

		array.push(newData)

		// Redirecting to home page after creation done
		history('/')
	}

	function saveImage(files) {
		setImage(files)
		setPreviewImage(URL.createObjectURL(files[0]))
	}

	return (
		<div >

			<Form className="d-grid gap-2" style={{ margin: '15rem' }}>

				<Alert show={close} variant="danger" onClose={() => setClose(false)} dismissible>
					Ukuran file max 100KB besar bro.
				</Alert>

				{/* Fetching a value from input textfirld
					in a setname using usestate*/}
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
					<Form.Control onChange=
						{e => setNamaBarang(e.target.value)}
						type="text"
						placeholder="Masukkan nama barang" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control onChange=
						{e => setHargaBeli(e.target.value)}
						type="number"
						placeholder="Masukkan harga beli" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control onChange=
						{e => setHargaJual(e.target.value)}
						type="number"
						placeholder="Masukkan harga jual" required />
				</Form.Group>

				<Form.Group className="mb-3"
					controlId="formBasicName">
					<Form.Control onChange=
						{e => setStok(e.target.value)}
						type="number"
						placeholder="Masukkan stok barang" required />
				</Form.Group>

				<Button
					onClick={e => handelSubmit(e)}
					variant="primary" type="submit">
					Submit
				</Button>

				{/* Redirecting back to home page */}
				<Link className="d-grid gap-2" to='/'>
					<Button variant="info" size="lg">
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

export default Create
