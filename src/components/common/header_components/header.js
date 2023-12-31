import React, { Fragment, useState, useEffect } from "react";
import SearchHeader from "./searchHeader";
import UserMenu from "./user-menu";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { AlignLeft,	Bell, MoreHorizontal,} from "react-feather";

//images
import logo from "../../../assets/images/dashboard/multikart-logo.png";

const Header = () => {
	
	const baseUrl = "https://guaytambosfit.com/modelsGym/models/actives/deu.php";
	const history = useNavigate();	
    const [data, setData] = useState([
		{count: '0'}
	]);	
	const [sidebar, setSidebar] = useState(true);
	const [navMenus, setNavMenus] = useState(false);
	
	const requestGetD=async()=>{		
		await axios.get(baseUrl).then(response=>{
			setData(response.data);		
	})
	}	

	useEffect(()=>{			
		requestGetD();
    },[])
	
	const toggle = () => {		
		setNavMenus(!navMenus)
	};	
	const openCloseSidebar = () => {
		if (sidebar) {
			setSidebar(false);
			document.querySelector(".page-main-header").classList.add("open");
			document.querySelector(".page-sidebar").classList.add("open");
			document.querySelector(".footer").classList.add("open");
		} else {
			setSidebar(true);
			document.querySelector(".page-main-header").classList.remove("open");
			document.querySelector(".page-sidebar").classList.remove("open");
			document.querySelector(".footer").classList.remove("open");
		}
	};
	const routeChange = () => {
		requestGetD();

		history(`${process.env.PUBLIC_URL}/actives/list-reactive`);
	};
	

	return (
		<Fragment>
			{/* open */}
			<div className="page-main-header ">
				<div className="main-header-right row">
					<div className="main-header-left d-lg-none col-auto">
						<div className="logo-wrapper">
							<a href="#">
								<img className="blur-up lazyloaded" src={logo} alt="" />
							</a>
						</div>
					</div>
					<div className="mobile-sidebar col-auto p-0">
						<div className="media-body text-end switch-sm">
							<label className="switch">
								<a href="#javaScript" onClick={openCloseSidebar}>
									<AlignLeft />
								</a>
							</label>
						</div>
					</div>
					<div className="nav-right col">						
							<span onClick={()=>routeChange()}>
								<Bell  />
									<span className="badge rounded-pill badge-primary pull-right notification-badge">
										{data[0].count}
									</span>
								<span className="dot"></span>
							</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
	
};

export default Header;
