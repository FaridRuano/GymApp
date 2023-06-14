import React, { Fragment,useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';


const Create_plan = () => {
    const baseUrl = "https://guaytambosfit.com/modelsGym/models/plans/plans.php";	
	const history = useNavigate();
    const [data, setData] = useState([]);	

	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }

	
	const [selectedPlan, setSelectedPlan] = useState({
		nom: '',
		asis: '',
		dura: '',
		cost: ''
	  });
	const handleChange=e=>{		
		const{name, value}=e.target;
		setSelectedPlan((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}
	useEffect(()=>{
        requestGet();
    },[])

	function isEmpty(){
		let key = false;
		let nomPlan = selectedPlan.nom.toUpperCase();
		let nom = selectedPlan.nom;
		let dura = selectedPlan.dura;
		let asis = selectedPlan.asis;
		let cost = selectedPlan.cost;
		let repeated = data.some(value => value.nom_plan === nomPlan);	

		if(nom.length<1){
			toast.error("Nombre vacio");
			key = true;
		}
		if(dura.length<1){
			toast.error("Duracion vacia");
			key = true;
		}	
		if(asis.length<1){
			toast.error("Asistencias vacio");
			key = true;
		}
		if(cost.length<1){
			toast.error("Costo vacio");
			key = true;
		}
		if(repeated){
			toast.error("Nombre Repetido");
			key = true;
		}

		return key;
	}
	
	const requestPost=async()=>{			
		if(!isEmpty()){
			var f = new FormData();
			f.append("nom", selectedPlan.nom);
			f.append("asis", selectedPlan.asis);
			f.append("dura", selectedPlan.dura);
			f.append("cost", selectedPlan.cost);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setSelectedPlan('');
			}).catch(error=>{
			console.log(error);
			});		
			toast.success("Agregado Exitosamente!");
			routeChange();
		}
		
	}	
	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/plans/list-plan`);
	};	
	return (
		
		<Fragment>			
			<Breadcrumb title="Crear Nuevo Plan"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Agregar Plan</h5>
							</CardHeader>
							<CardBody>
								<Form className="needs-validation">
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Nombre Plan
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												maxLength={254}												
												id="validationCustom0"
												type="text"
												required=""
												name="nom"
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Asistencias
										</Label>
										<div className="col-md-8">

											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='asis'
												allowNegative={false}
												decimalScale={0}
												onChange={handleChange}/>									
										</div>
									</div>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Duracion
										</Label>
										<div className="col-md-8">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='dura'
												allowNegative={false}
												decimalScale={0}
												onChange={handleChange}/>
											
										</div>
									</div>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Costo
										</Label>
										<div className="col-md-8">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='cost'
												allowNegative={false}
												decimalScale={2}
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

export default Create_plan;
