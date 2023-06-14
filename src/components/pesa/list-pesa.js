import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Col, Container, Row, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { ToastContainer,toast } from "react-toastify";

const List_user = () => {
	const baseUrl = "https://guaytambosfit.com/modelsGym/models/pesaje/pesa.php";	

	const [search, setSearch] = useState("");
    const [data, setData] = useState([]);		
	const [filtered, setFiltered] = useState([]);

	const col=[		
		{
			name: 'Nombre',
			selector: row => row.ced,
		},
		{
			name: 'Fecha',
			selector: row => row.fec,
			sortable: true,
			wrap: true
		},
		{
			name: 'Peso',
			selector: row => row.peso,
            cell: (row) => (
                <span>{row.peso} kg</span>
            )
		},
		{
			name: 'Altura',
			selector: row => row.altura,
            cell: (row) => (
                <span>{row.altura} cm</span>
            )
		},		
		{
			name: "Eliminar",
			id: "delete",
			accessor: (str) => "delete",
			cell: (row) => (
				
					<span style={{cursor:'pointer'}} onClick={(e) => {						
						if (window.confirm("Estas seguro que deseas eliminar?"))
						requestDelete(row.id);
					}}>
						<i
							className="fa fa-trash"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "#e4566e",
							}}
						></i>
					</span>
				),
			style: {
				textAlign: "center",
			},
			sortable: false,
		}
	]
	
	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
			setFiltered(response.data);
        })
    }

	const requestDelete=async(id)=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
		f.append("id", id);
        await axios.post(baseUrl, f).then(response=>{
            setData(data.filter(row=>row.id!==id));
        }).catch(error=>{
          console.log(error);
        })
		toast.success("Eliminado Exitosamente!");
        requestGet();
    }

	useEffect(()=>{
        requestGet();
    },[])

	useEffect(()=>{
		const result = data.filter(cli =>{
			return cli.ced.toLowerCase().match(search.toLowerCase());
		});

		setFiltered(result);
	},[search])
	
	const columnsPDF = [
		{title: "Nombre", field: "ced"},
		{title: "Fecha", field: "fec"},
		{title: "Peso", field: "peso"},		
		{title: "Altura", field: "altura"},		
	]

	const downloadPdf=()=>{
		const doc=new jsPDF()
		doc.text("Guaytambos Fit Pesajes",20,10)
		doc.autoTable({
			theme: "grid",
			columns:columnsPDF.map(col => ({ ...col, dataKey: col.field })),
			body:data,
		})
		doc.save('gfit_pesos.pdf')
		toast.info("Reporte Completado!");
	}

	return (
		<Fragment>
			<Breadcrumb title="Control de Pesos" parent="Menu" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Registros de pesos</h5>
							</CardHeader>
							<CardBody >				
								<Row xl="3">
									<Col>
										<Card className="col" >
											<Link to="/pesa/create-pesa" className="btn btn-primary">
												Nuevo Pesaje
											</Link>
										</Card>
									</Col>									
									<Col>
										<Card className="col">										
											<Button className="btn btn-secondary" onClick={() => downloadPdf()}>
												Exportar a PDF
											</Button>
										</Card>	
									</Col>								
									<Col md>
										<Card>
											<Input
												type="text"
												placeholder="Ingresa un nombre"
												value={search}
												onChange={(e) => setSearch(e.target.value)}

											/>
										</Card>												
									</Col>																			
								</Row>																														
								<div
									id="batchDelete"
									className="category-table order-table coupon-list-delete"
								>
									<DataTable
										pagination
										columns={col}
										data={filtered}
										pageSize={6}
										class="-striped -highlight"
										noDataComponent="No hay datos para mostrar" 										
									/>
									<ToastContainer theme="colored"/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default List_user;
