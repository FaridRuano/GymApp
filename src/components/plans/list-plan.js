import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import {useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { ToastContainer,toast } from "react-toastify";


const List_plan = () => {
    const baseUrl = "https://guaytambosfit.com/modelsGym/models/plans/plans.php";	
    const [data, setData] = useState([]);		
	
	const col=[
		{
			name: 'ID',
			selector: row => row.id_plan,
		},
		{
			name: 'Nombre',
			selector: row => row.nom_plan,
		},
		{
			name: 'Asistencias',
			selector: row => row.asis_plan,
		},
		{
			name: 'Duracion',
			selector: row => row.dura_plan,
		},
		{
			name: 'Costo',
			selector: row => row.cost_plan,
		},
		{
			name: "Eliminar",
			id: "delete",
			accessor: (str) => "delete",
			cell: (row) => (				
					<span style={{cursor:'pointer'}} onClick={(e) => {						
						if (window.confirm("Estas seguro que deseas eliminar?"))
						requestDelete(row.id_plan);
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
        })
    }
	const requestDelete=async(id_plan)=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
		f.append("id", id_plan);
        await axios.post(baseUrl, f).then(response=>{
            setData(data.filter(row=>row.id_plan!==id_plan));
        }).catch(error=>{
          console.log(error);
        })
		toast.success("Eliminado Exitosamente!");
        requestGet();
    }
	useEffect(()=>{
        requestGet();
    },[])
	
	const columnsPDF = [
		{title: "ID", field: "id_plan"},
		{title: "Nombre", field: "nom_plan"},
		{title: "Asistencias", field: "asis_plan"},
		{title: "Duracion", field: "dura_plan"},
		{title: "Costo", field: "cost_plan"},
	]

	const downloadPdf=()=>{
		const doc=new jsPDF()
		doc.text("Guaytambos Fit Planes",20,10)
		doc.autoTable({
			theme: "grid",
			columns:columnsPDF.map(col => ({ ...col, dataKey: col.field })),
			body:data,
		})
		doc.save('gfit_planes.pdf')
		toast.info("Reporte Completado!");
	}

	return (
		<Fragment>
			<Breadcrumb title="Lista de Planes" parent="Menu" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Planes</h5>
							</CardHeader>
							<CardBody>
								<Col xl="7 sm-20 row">
									<Card className="col" >
										<Link to="/plans/create-plan" className="btn btn-primary">
											Nuevo Plan
										</Link>
									</Card>						
									<Card className="col">
										<button className="btn btn-secondary" onClick={() => downloadPdf()}>
											Exportar a PDF
										</button>
									</Card>	
								</Col>
															
								<div
									id="batchDelete"
									className="category-table order-table coupon-list-delete"
								>
									<DataTable
										pagination
										columns={col}
										data={data}
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

export default List_plan;

