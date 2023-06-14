import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Col, Container, Row, Input, Button } from "reactstrap";
import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { ToastContainer,toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";



const List_reactive = () => {
	const baseUrl = "https://guaytambosfit.com/modelsGym/models/actives/actives.php";	
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);		
	const [filtered, setFiltered] = useState([]);		
	const navigate = useNavigate();
	
	const col=[
		{
			name: "Opciones",
			id: "options",
			accessor: (str) => "delete",
			cell: (row) => (
					<span style={{cursor:'pointer'}} onClick={(e) => {						
						if(deuState(row.deu)){
							toast.error("Cliente mantiene deuda!");							
						}else{
							routeChange(row.id);
						}
					}}>
						<i	
							className={!deuState(row.deu)?"fa fa-pencil":"fa fa-ban"}
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: deuState(row.deu)?"#e4566e":"#33d493",
							}}
						></i>
					</span>
				),
			style: {
				textAlign: "center",
			},			
		},
		{
			name: 'ID',
			selector: row => row.id,
		},
		{
			name: 'Nombre',
			selector: row => row.nom,
			wrap: true
		},
		{
			name: 'Plan',
			selector: row => row.plan,
		},
		{
			name: 'Fecha Inicio',
			selector: row => row.ini,
			sortable: true,
		},
		{
			name: 'Fecha Final',
			selector: row => row.fin,
			sortable: true,
		},		
		{
			name: 'Asistencias',
			selector: row => row.asi,
			sortable: true,
		},		
		{
			name: "Deuda",
			sortable: true,
			selector: row => row.deu,			
			accessor: (str) => "delete",
			cell: (row) => (
				<div className={deuState(row.deu)?'bg-warning b-r-8':'bg-primary b-r-8'}>
					<p style={{color: 'white'}}>
						<i className="fa fa-dollar"/> {row.deu}
					</p>				
				</div>)
					
		}		
	]
	const routeChange = (id) => {
		let path='/actives/create-active';
		navigate(path,{state: {id:id}});
		/* navigate(`${process.env.PUBLIC_URL}/actives/create-active`,{id: id}); */
	};	
	function deuState(deu){
		if(deu>0){
			return true;
		}
		return false;
	}
	const requestGet=async()=>{
        await axios.get(baseUrl+'?METHOD=NEED_UPDATE').then(response=>{
            setData(response.data);
			setFiltered(response.data);
        })
    }	
	useEffect(()=>{
        requestGet();
    },[])
	useEffect(()=>{
		const result = data.filter(cli =>{
			return cli.nom.toLowerCase().match(search.toLowerCase());
		});

		setFiltered(result);
	},[search])
	
	const columnsPDF = [
		{title: "ID", field: "id"},
		{title: "Nombre", field: "nom"},
		{title: "Plan", field: "plan"},
		{title: "Fecha Inicio", field: "ini"},
		{title: "Fecha Final", field: "fin"},
		{title: "Asistencias", field: "asi"},
		{title: "Deuda", field: "deu"},

	]

	const downloadPdf=()=>{
		const doc=new jsPDF()
		doc.text("Guaytambos Fit Deudores",20,10)
		doc.autoTable({
			theme: "grid",
			columns:columnsPDF.map(col => ({ ...col, dataKey: col.field })),
			body:data,
		})
		doc.save('gfit_pendientes.pdf')
		toast.info("Reporte Completado!");
	}

	return (
		<Fragment>
			<Breadcrumb title="Planes Caducados" parent="Menu" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Lista de Pendientes Actualizacion</h5>
							</CardHeader>
							<CardBody>		
								<Row xl="2">									
									<Col>
										<Card>
											<Button className="btn btn-secondary" onClick={() => downloadPdf()}>
												Exportar a PDF
											</Button>
										</Card>	
									</Col>	
									<Col md>
										<Input
											type="text"
											placeholder="Ingresa un nombre"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
										/>
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

export default List_reactive;
