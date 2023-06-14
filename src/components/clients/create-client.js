import React, { Fragment,useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from "dayjs";

const Create_reactive = () => {
	const baseUrl = "https://guaytambosfit.com/modelsGym/models/clients/clients.php";	
    const plansUrl = "https://guaytambosfit.com/modelsGym/models/plans/plans.php";	

	const history = useNavigate();
    const [data, setData] = useState([]);	
    const [value, setValue] = useState([dayjs()]);

    const [dataPlans, setDataPlans] = useState([]);	

	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }
	const requestGetPlans=async()=>{
        await axios.get(plansUrl).then(response=>{
            setDataPlans(response.data);
        })
    }

	
	const [selectedClient, setselectedClient] = useState({
		ced: '',
		nom: '',
		ape: '',
		email: '',
		tel: '',
		dir: '',
		eme: '',
		plan: '',
		ini: '',
	  });
	const handleChange=e=>{		
		const{name, value}=e.target;
		setselectedClient((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}
	function onChangeDate(value){
		let date = dayjs(value).format('YYYY-MM-DD')
		setselectedClient({...selectedClient, ini: date});
		setValue(value);
	}
	useEffect(()=>{
        requestGet();
		requestGetPlans();
    },[])
	function isValidEmail(){
		let email = selectedClient.email;
		let validate = /\S+@\S+\.\S+/.test(email);
		if(!validate){
			toast.error("Email no es valido");
		}
		return !validate;
	}
	function isRepeated(){
		let cedF = selectedClient.ced;
		let repeatedCed = data.some(value => value.ced === cedF);	
		let emailF = selectedClient.email;
		let repeatedEmail = data.some(value => value.email === emailF);	
		let key = false;
		if(repeatedCed){
			toast.error("Cedula ya existe");
			key = true;
		}		
		if(repeatedEmail){
			toast.error("Email ya existe");
			key = true;
		}
		return key;
	}
	function isEmpty(){
		let key = false;
		let ced = selectedClient.ced;
		let nom = selectedClient.nom;
		let ape = selectedClient.ape;
		let plan = selectedClient.plan;
		if(ced.length<10){
			toast.error("Cedula incompleta");
			key = true;
		}
		if(nom.length<3){
			toast.error("Nombre incompleto");
			key = true;
		}
		if(ape.length<3){
			toast.error("Apellido incompleto");
			key = true;
		}	
		if(plan.length<1){
			toast.error("Plan incompleto");
			key = true;
		}	
		return key;
	}

	const requestPost=async()=>{	
		let emptiness, repeatness, valideteness = false;
		emptiness = isEmpty();
		repeatness = isRepeated();
		valideteness = isValidEmail();
				
		if(!emptiness && !repeatness && !valideteness){		
			var f = new FormData();   
			f.append("ced", selectedClient.ced);
			f.append("nom", selectedClient.nom);
			f.append("ape", selectedClient.ape);
			f.append("email", selectedClient.email);
			f.append("tel", selectedClient.tel);
			f.append("dir", selectedClient.dir);
			f.append("eme", selectedClient.eme);
			f.append("plan", selectedClient.plan);
			f.append("ini", selectedClient.ini);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setselectedClient('');
			}).catch(error=>{
			console.log(error);
			});		
			toast.success("Agregado Exitosamente!");
			routeChange();
		}
	}	
	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/clients/list-client`);
	};

	return (
		<Fragment>			
			<Breadcrumb title="Crear Nuevo Cliente"/>
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
											<span>*</span> Cedula
										</Label>
										<div className="col-md-4">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='ced'
												maxLength={10}												
												allowNegative={false}
												decimalScale={0}
												allowLeadingZeros
												onChange={handleChange}
												/>												
										</div>																			
									</div>		
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Nombre
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												maxLength={254}																
												name="nom"
												onChange={handleChange}
											/>
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Apellido
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												maxLength={254}																
												name="ape"
												onChange={handleChange}
											/>
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Email
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												maxLength={254}																
												name="email"
												onChange={handleChange}
											/>
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Telefono
										</Label>
										<div className="col-md-4">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='tel'
												maxLength={10}												
												allowNegative={false}
												decimalScale={0}
												allowLeadingZeros

												onChange={handleChange}
												/>
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Direccion
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												maxLength={254}															
												name="dir"
												onChange={handleChange}
											/>
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Telefono de emergencia
										</Label>
										<div className="col-md-4">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='eme'
												maxLength={10}												
												allowNegative={false}
												decimalScale={0}
												allowLeadingZeros
												onChange={handleChange}
												/>
										</div>
									</div>										
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Plan
										</Label>
										<div className="col-md-8">
											<select						
												className="form-control" 
												name="plan"
												onChange={handleChange}
												>		
													<option key="" value=""></option>
												{dataPlans.map((elemento)=>(
                    								<option key={elemento.id_plan} value={elemento.nom_plan}>{elemento.nom_plan}</option>
                 								))}
											</select>

											{/* <Input
												className="form-control"
												maxLength={254}				
												id="validationCustom0"
												type="text"
												required=""
												name="plan"
												onChange={handleChange}
											/> */}
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Fecha de Inicio
										</Label>
										<div className="col-md-8">
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DesktopDatePicker
												inputFormat="YYYY-MM-DD"																								
												openTo="day"
												views={['month', 'day']}
												minDate={dayjs('2017-01-01')}
												value={value}
												onChange={(newValue) => {
												  onChangeDate(newValue);
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
    									</LocalizationProvider>
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

export default Create_reactive;
