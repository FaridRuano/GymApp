import React, { Fragment,useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios';
import {  useLocation, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from "dayjs";

const Create_active = () => {

      
    const baseUrl = "https://guaytambosfit.com/modelsGym/models/actives/actives.php";	   
    const plansUrl = "https://guaytambosfit.com/modelsGym/models/plans/plans.php";
    const deuUrl = "https://guaytambosfit.com/modelsGym/models/actives/deu.php";	
    const location = useLocation();
	const history = useNavigate();
    const [value, setValue] = useState([dayjs()]);
    const [dataPlans, setDataPlans] = useState([]);	
    const [dataDeu, setDataDeu] = useState(
        [{deu: '0',}]
    );	
    const id = isNull(); 
    function isNull(){
        let x =0;
        if(location.state===null){
            return x;
        }else{
            x = location.state.id;
        }
        return x;
    }
    const [selectedActive, setselectedActive] = useState({
		id: id,
		plan: '',
		ini: '',
	  });
    

	const requestGetPlans=async()=>{
        await axios.get(plansUrl).then(response=>{
            setDataPlans(response.data);
        })
    }
    useEffect(()=>{
		requestGetPlans();
    },[])
    const requestGetDeu=async()=>{        
        var f = new FormData();   
		f.append("id", selectedActive.id);
        f.append("METHOD", "POST");
        await axios.post(deuUrl, f).then(response=>{
            setDataDeu(response.data);
        })        

    }	
	const handleChange=e=>{		
		const{name, value}=e.target;
		setselectedActive((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}	    
    function onChangeDate(value){
		let date = dayjs(value).format('YYYY-MM-DD')
		setselectedActive({...selectedActive, ini: date});
		setValue(value);
		console.log(selectedActive);		
	}
	function isEmpty(){
		let key = false;
		let id = selectedActive.id;
		let plan = selectedActive.plan;
		if(id===0){
			toast.error("ID incompleto");
			key = true;
		}	
		if(plan.length<1){
			toast.error("Plan incompleto");
			key = true;
		}	
		return key;
	}    
    function deuExist(){
        requestGetDeu();
        let z = dataDeu[0].deu;
        if(z<1){
            return false;
        }
		toast.error("Cliente mantiene deuda!");
        return true;
    }
	const requestPost=async()=>{	
		let emptiness = false;
		let debtless = false;
		emptiness = isEmpty();
        debtless = deuExist();
        
		if(!emptiness && !debtless){		
			var f = new FormData();   
			f.append("id", selectedActive.id);
			f.append("plan", selectedActive.plan);
			f.append("ini", selectedActive.ini);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setselectedActive('');
                console.log(response)
			}).catch(error=>{
			console.log(error);
			});		
			toast.success("Agregado Exitosamente!");
			routeChange();
			toast.success("Correcto");
		}
	}	
	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/actives/list-actives`);
	};
    

	return (
		<Fragment>			
			<Breadcrumb title="Actualizar Plan"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Cliente</h5>
							</CardHeader>
							<CardBody>
								<Form className="needs-validation">
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> ID: 
										</Label>
										<div className="col-md-4">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												name='id'
												maxLength={4}												
												allowNegative={false}
												decimalScale={0}
                                                value={id===0?'':id}
												onChange={handleChange}
												/>												
										</div>																			
									</div>											
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Plan:
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
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Fecha de Inicio:
										</Label>
										<div className="col-md-8">
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DesktopDatePicker
												inputFormat="YYYY-MM-DD"																								
												openTo="day"
												views={['month', 'day']}
												minDate={dayjs('2023-01-01')}
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

export default Create_active;
