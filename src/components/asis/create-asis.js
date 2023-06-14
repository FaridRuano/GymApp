import React, { Fragment,useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';

const Create_asis = () => {
    const baseUrl = "https://guaytambosfit.com/modelsGym/models/asis/asis.php";	
	const history = useNavigate();
	
	const [selectedAsi, setSelectedAsi] = useState({
		id: '',
		monto: '',
	  });
	const handleChange=e=>{		
		const{name, value}=e.target;
		setSelectedAsi((prevState)=>({
			...prevState,
			[name]: value,
		}))		
		console.log(selectedAsi);
	}
	function isEmpty(){
		let key = false;
		let id = selectedAsi.id;
		if(id.length<1){
			toast.error("ID Cliente incompleto");
			key = true;
		}			
		return key;
	}
	const requestPost=async()=>{	
		let emptiness = false;
		emptiness = isEmpty();
		if(!emptiness){		
			toast.success("Agregado Exitosamente!");
			var f = new FormData();
			f.append("id", selectedAsi.id);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setSelectedAsi('');
			}).catch(error=>{
			console.log(error);
			});		
			routeChange();
		}
		
	}	
	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/asis/list-asis`);
	};	
	return (
		<Fragment>			
			<Breadcrumb title="Registrar Asistencia"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Crear Asistencia</h5>
							</CardHeader>
							<CardBody>
								<Form className="needs-validation">
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> ID Cliente
										</Label>
										<div className="col-md-8">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='id'
												allowNegative={false}
												decimalScale={0}
												onChange={handleChange}/>											
										</div>
									</div>																							
									<Button type="button" color="primary" onClick={()=>requestPost()}>
										Guardar
									</Button>	
									<ToastContainer theme="colored"/>								
								</Form>

							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Create_asis;
