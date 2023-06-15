import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';
import { Autocomplete} from "@mui/joy";
import { useEffect } from "react";

const Create_pays = () => {

    const baseUrl = "https://guaytambosfit.com/modelsGym/models/pays/pays.php";
	const deuUrl = "https://guaytambosfit.com/modelsGym/models/actives/deu.php";	

	const history = useNavigate();

	const [name, setName] = useState(null)
	const [monto, setMonto] = useState(null)


	const [cliData, setCliData] = useState({
		id: null,
		plan: null,
		deu: null,
		saldo: null,
	})

	const handleCli = (value, name) => {
		setCliData((prevState) => ({
			...prevState,
			[name] : value,
		}))
	}

	const [data, setData] = useState([])

	const reqData = async() => {
		await axios.get(deuUrl+'?METHOD=CLIDATA').then(response=>{
            setData(response.data)
        }) 
	}

	const reqPost=async()=>{
		if(monto !== null && cliData.id !== null){		
			var f = new FormData();
			f.append("id", cliData.id);
			f.append("monto", monto);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setCliData(null)	
				toast.success("Agregado Exitosamente!");
				routeChange();								
				
			}).catch(error=>{
				console.log(error);
			});											
		}else{
			toast.error("Campos vacios!");
		}
	}	

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/pays/list-pay`);
	};	

	useEffect(()=>{
		reqData()
	},[])

	const op_name = data.map(item => item.name)

	return (
		<Fragment>			
			<Breadcrumb title="Registrar Pago"/>
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>Crear Pago</h5>
					</CardHeader>
					<CardBody>
						<Form className="needs-validation">
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Cliente
								</Label>
								<div className="col-md-8">
									<Autocomplete
										options={op_name}
										sx={{ borderRadius: '3px'}}
										noOptionsText='No coincide ninguno'
										placeholder='Nombre'
										value={name}
										onChange={(event, newValue) => {
											setName(newValue)
											const matchingCli = data.find(obj=>obj.name === newValue)
											if(matchingCli){
												handleCli(matchingCli.id,'id')
												handleCli(matchingCli.deu,'deu')
												handleCli(matchingCli.plan,'plan')												
											}else{
												handleCli(null,'id')
												handleCli(null,'deu')
												handleCli(null,'plan')	
												setMonto(null)
											}
										}}
									/>										
								</div>
							</div>
							<hr/>							
							<Fragment>
								<Row>
									<Col xl='3' md='4' style={{display: 'flex', alignItems:'center', justifyContent: 'end'}}>
										<Label><h3 style={{fontSize: '16px'}}>Información</h3></Label>
									</Col>
									<Col md='8'>
										<Row>
											<Col xl='3' md='4'>
												<span style={{fontWeight: 'bold'}}>Plan Actual</span>
											</Col>
											<Col md='8'>
												<p>{cliData.plan ? cliData.plan : 'Sin info'}</p>
											</Col>
										</Row>
										<Row>
											<Col xl='3' md='4'>
												<span style={{fontWeight: 'bold'}}>Deuda Actual</span>
											</Col>
											<Col md='8'>
												<p><i className="fa fa-dollar"/>{cliData.deu ? cliData.deu : '0.00'}</p>
											</Col>
										</Row>
									</Col>
								</Row>
							</Fragment>						
							<hr/>

							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Monto
								</Label>
								<div className="col-md-8">
									<NumericFormat  
										className="form-control"
										customInput={Input}
										name='monto'										
										allowNegative={false}
										allowLeadingZeros={false}
										decimalScale={2}
										value={monto || ''}
										placeholder='0.00'
										onChange={(e) => {											
											setMonto(e.target.value)																																
											handleCli(cliData.deu-e.target.value,'saldo')												
											
										}}			
										readOnly={cliData.deu !== null ? false : true}														
										/>															
								</div>
							</div>			
							<Row>
								<Col xl='3' md='4' style={{display: 'flex', alignItems:'center', justifyContent: 'end'}}>
									<span style={{fontWeight: 'bold'}}><i className="fa fa-bookmark"/></span>
								</Col>
								<Col md='8'>
									<Row>
										<Col xl='3' md='4'>
											<span style={{fontWeight: 'bold'}}>Saldo Restante</span>
										</Col>
										<Col md='8'>
											<p>
												{cliData.saldo<0 ? 
													<span style={{color: '#e35'}}>
														Valor invalido
													</span>
												: 
													<span>
														<i className="fa fa-dollar"/>{monto ? cliData.saldo : '0.00'}
													</span>																								
												}
											</p>
										</Col>
									</Row>
								</Col>
							</Row>												
							<Button type="button" color="primary" onClick={() => reqPost()}>
								Guardar
							</Button>	
						</Form>					

					</CardBody>
				</Card>
			</Container>
			<ToastContainer theme="colored"/>								
		</Fragment>
	);
};

export default Create_pays;
