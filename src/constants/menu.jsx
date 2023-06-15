import {
    Home,
    DollarSign,
    Tag,
    Clipboard,
    Users,
    UserCheck,
    BarChart,
    Settings,
    FileText
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Tablero', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Plans', icon: Tag, type: 'sub', active: false, children: [
            { path: '/plans/list-plan', title: 'Lista de Planes', type: 'link' },
            { path: '/plans/create-plan', title: 'Nuevo Plan', type: 'link' },
        ]
    },
    {
        title: 'Clientes', icon: Users, type: 'sub', active: false, children: [
            { path: '/clients/list-client', title: 'Lista de Clientes', type: 'link' },
            { path: '/clients/create-client', title: 'Nuevo cliente', type: 'link' },
        ]
    }, 
    {
        title: 'Activos', icon: UserCheck, type: 'sub', active: false, children: [
            { path: '/actives/list-actives', title: 'Lista de Activos', type: 'link' },
            { path: '/actives/list-reactive', title: 'Pendiente Actualizacion', type: 'link' },
            { path: '/actives/create-active', title: 'Actualizar', type: 'link' },
        ]
    },
    {
        title: 'Pagos', icon: DollarSign , type: 'sub', active: false, children: [
            { path: '/pays/list-pay', title: 'Lista de Pagos', type: 'link' },
            { path: '/pays/create-pay', title: 'Nuevo Pago', type: 'link' },
        ]
    }, 
    {
        title: 'Asistencias', icon: Clipboard , type: 'sub', active: false, children: [
            { path: '/asis/list-asis', title: 'Lista de Asistencias', type: 'link' },
            { path: '/asis/create-asis', title: 'Nueva Asistencia', type: 'link' },
        ]
    }, 
    {
        title: 'Medidas', icon: FileText , type: 'sub', active: false, children: [
            { path: '/pesa/list-pesa', title: 'Lista de Pesajes', type: 'link' },
            { path: '/pesa/create-pesa', title: 'Nuevo Pesaje', type: 'link' },
        ]
    },         
    {
        title: 'Reportes',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    {   
        path: '/settings/profile', title: 'Configuracion', icon: Settings, type: 'link', badgeType: 'primary', active: false    
    }    
]
