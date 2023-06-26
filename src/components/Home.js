import React, { useState } from 'react';
import { Button, Table, Modal, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import array from './array';
import { Link, useNavigate } from 'react-router-dom';
import Search from './search';

function Home() {

	let history = useNavigate()
	const [show, setShow] = useState(false);
  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	const [id, setId] = useState();
	const [namaBarang, setNamaBarang] = useState();

	function saveToLocal(item) {
		Object.entries(item).forEach(([key, value]) => {
			localStorage.setItem(key, value);
		})
	}

	function doDeleted() {
		const itemIndex = array.findIndex(item => item.id === id);
		array.splice(itemIndex, 1);
		handleClose();
		history('/')
	}

	function deletedById(id, namaBarang) {
		handleShow();
		setId(id);
		setNamaBarang(namaBarang);
	}

	return (
		<div style={{ margin: '10rem' }} >
			<Search/><br/>
			
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Image Barang</th>
						<th>Nama Barang</th>
						<th>Harga Beli</th>
						<th>Harga Jual</th>	
						<th>Stok</th>
						<th></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>

					{array.map((item) => {
						return (
							<tr>
								<td><Image src={item.image} thumbnail style={{height: '108px'}}/></td>
								<td>{item.namaBarang}</td>
								<td>Rp.{item.hargaBeli}</td>
								<td>Rp.{item.hargaJual}</td>
								<td>{item.stok}</td>
								{/* getting theid,name, and
									age for storing these
									value in the jsx with
									onclick event */}
								<td><Link to={`/edit`}>
									<Button onClick={(e) => saveToLocal(item)}
									variant="info">
									Edit</Button></Link>
								</td>

								{/* Using thr deleted function passing
									the id of an entry */}
								<td>
									<Button 
										onClick={e => deletedById(item.id, item.namaBarang)} variant="danger">Delete
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda akan menghapus data barang [{namaBarang}]</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Tidak
          </Button>
          <Button variant="primary" onClick={() => doDeleted()}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>

			{/* Button for redirecting to create page for
				insertion of values */}
			<Link className="d-grid gap-2" to='/create'>
				<Button variant="primary" size="lg">Create</Button>
			</Link>
		</div>
	)
}

export default Home
